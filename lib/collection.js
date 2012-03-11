var Query = require("./query"),
    config = require("./config");

function merge(a, b) {
  /*
    TODO Array.concat is slow!
  */
  return a.concat(b);
}

function diff(a, b, keyName) {
  var i, keys, ret, j;
  i = b.length;
  keyName = keyName || "id";
  keys = [];
  ret = [];
  while(i--) {
    keys.push(b[i][keyName]);
  }
  i = a.length;
  while(i--) {
    j = keys.indexOf(a[i][keyName]); 
    if(j > -1) {//we found the same element in both a & b
      keys.splice(j, 1);//keys are unique; we don't need to filter the same key more than once
      continue;
    }
    ret.push(a[i]);
  }
  return ret;
}


var collections = {};

function Collection(opt) {
  this.storeKey = opt.storeKey || config.defaults.STOREKEY;
  // this.storeKey = opt.storeKey;
  this.type = opt.type || config.defaults.TYPENAME;
  // this.type = opt.type;
  this.keys = [];
  this.hash = {};
  this.content = [];
  if(opt.content) {
    var i = opt.content.length;
    while(i--) {
      this.add(opt.content[i]);
    }
  }
  
  
  Object.defineProperty(this, "length", {
    enumerable: true,
    configurable: false,
    get: function() {
      return this.all().length;
    }
  });
  
}

Collection.prototype = {
  
  all: function() {
    return this.content;
  },
  
  find: function(q) {
    var conditions, i, len, c, ctx, result, found, logic;
    
    q = Query.build(q);
    conditions = q.conditions;
    // result = this.source.all(q.type);
    result = [];
    ctx = this.all();
    for(i=0, len=conditions.length; i<len; i++) { 
      c = conditions[i];
      logic = c.condition;
      // console.log(logic, ctx, c);
      
      switch(logic) {
        case "OR": 
        case "*":
          found = Query.find(c, ctx);
          result = merge(result, found);
        break;
        case "AND":
          if(!result.length) continue;
          result = found = Query.find(c, ctx);
        break;
      }
      // console.log(result);
      
      ctx = diff(ctx, found); 
    }
    return result;
  },
  
  add: function(record) {
    var key = record[this.storeKey];
    // console.log(record);
    
    if(this.keys.indexOf(key) > -1) {
      console.warn("[Collection::add] Duplicate record id", key);
      // this.update(record);
    } else {
      this.content.push(record);
      this.keys.push(key);
      this.hash[key] = record;
    }
    return this;
  },
  
  remove: function(record) {
    var key, storeKey, i, c, ctx, idx;
    
    storeKey = this.storeKey;
    key = record[storeKey];
    ctx = this.content;
    
    idx = this.keys.indexOf(key);
    // console.log(idx);
    // console.log(this);
    
    if(idx > -1) {
      i = ctx.length;
      while(i--) {
        c = ctx[i];
        if(c[storeKey] == key) {
          ctx.splice(i, 1);
          break;
        }
      }//delete in this.content}
      this.keys.splice(idx, 1);//delete in this.keys
      this.hash[key] = null;//delete the record itself
      delete this.hash[key];//delete in this.hash
    }
    return this;
  },
  
  /*
    TODO 
  */
  // update: function(item) {
  //   var key, original, k;
  //   
  //   key = item[this.storeKey];
  //   original = this.hash[key];
  //   
  //   for(k in item) {
  //     if(item.hasOwnProperty(k)) {
  //       original[k] = item[k];
  //     }
  //   }
  //   
  //   return this;
  // },
  
  destroy: function() {
    var i;
    i = this.content.length;
    while(i--) {
      this.content[i] = null;
    }
    this.keys.length = 0;
    this.hash = null;
  }
  
};

module.exports = {
  
  get: function(type) {
    return collections[type];
  },
  
  create: function(opt) {
    var ret;
    
    if(!opt) opt = { type: config.defaults.STOREKEY };
    if(typeof opt == "string") opt = { type: opt };
    
    ret = new Collection(opt);
    collections[opt.type] = ret;
    return ret;
  }
  
};