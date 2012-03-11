var Collection = require("./collection");

console.log(Collection);


var guid = function(seed) {
  seed = seed || 0;
  return function() {
    return seed++;
  };
}();

function Store() {
  
}

Store.prototype = {
  
  // TYPES: {},
  // 
  // learn: function(Type, name) {
  //   name = name || Type.name;
  //   this.TYPES[name] = Type;
  //   return this;
  // },
  
  add: function(item, type) {
    var c;
    type = type || item.type;
    if(!type) {
      console.error("[Store::add] unknonw type for this item");
      return this;
    }
    item.id = item.id || guid();
    c = Collection.get(type);
    // console.log(item);
    
    if(c) {
      c.add(item);
    } else {
      c = Collection.create({
        content: [item],
        storeKey: item.storeKey,
        type: type
      });
    }
    return this;
  },
  
  remove: function(item, type) {
    var c;
    type = type || item.type;
    c = Collection.get(type);
    if(c) {
      c.remove(item);
    }
    return this;
  },

  /*
    TODO 
  */
  // update: function(item, type) {
  //   var c;
  //   type = type || item.type;
  //   c = Collection.get(type);
  //   if(c) {
  //     c.update(item);
  //   }
  //   return this;
  // },
  
  all: function(type) {
    var c;
    c = Collection.get(type);
    if(c) return c.all();
  },
  
  find: function(q) {
    var c, ret;
    ret = [];
    c = Collection.get(q.type);
    if(c) {
      ret = c.find(q);
    }
    return ret;
  }
  
};

module.exports = Store;