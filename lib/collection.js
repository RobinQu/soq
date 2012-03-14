var Query = require("./query"),
    config = require("./config");

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
    var conditions, ctx;
    
    q = Query.build(q);
    // conditions = q.conditions;
    // result = this.source.all(q.type);
    ctx = this.all();
    return q.find(ctx);
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