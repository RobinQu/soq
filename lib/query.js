var parser = require("./parser"),
    LT = require("./logic_tree");

var interpolate = function(rule, parameters) {
  return rule.replace(/\{([a-zA-z0-9]+)\}?/g, function(s, key) {
    s = parameters[key];
    return ((s === null) ? '(null)': (s === undefined) ? '': s).toString();
  });
};

var evaluate = function(content, left, op, right) {
  var ret;
  
  left = content[left];
  // console.log(left, right, op);
  
  switch(op) {
    
    case "=":
      ret = left === right;
      break;
    case ">":
      ret = left > right;
      break;
    case ">=":
      ret = left >= right;
      break;
    case "<":
      ret = left < right;
      break;
    case "<=":
      ret = left <= right;
      break;
    case "BEGINS_WITH":
      ret = left.substr(0, right.length) == right;
      // console.log(left, right, ret);
      
      break;
    case "ENDS_WITH":
      ret = left.substr(left.length - right.length) == right;
      break;
    case "CONTAINS":
      ret = left.indexOf(right) > -1;
      break;
    case "MATCHES":
      ret = right.test(left);
      break;
    case "TYPE_IS":
      /*
        TODO More accurate implementation
      */
      ret = typeof left == right;
      break;
  }
  return ret;
};

function Query(opt) {
  // if(!opt.conditions) {
  //   throw new Error("[aq::Query] should provide both model type and query conditions");
  // }
  this.conditions = opt.conditions ? parser.parse(opt.conditions) : [];
  this.type = opt.type;//default to '*'
  this.order = opt.orderBy || "id ASEC";
  this.parameters = opt.parameters || {};
}

Query.prototype = {
  
  find: function(ctx) {
    var self;
    
    self = this;
    
    return LT(this.conditions, ctx, function(c, ctx) {
      Query.compile(c, self.parameters);
      return Query.find(c, ctx);
    });
  },
  
  /*
    TODO 
  */
  sort: function() {},
  
  destroy: function() {
    this.condtions.length = 0;
    this.condtions = null;
    this.parameters = null;
    this.type = null;
    this.order = null;
  }
  
};

Query.compile = function(c, p) {
  if(c.compiled) return c;
  if(typeof c.value == "string") c.value = interpolate(c.value, p);
  c.compiled = true;
  return c;
};

Query.find = function(condition, context) {
  var i, c, ret, match;
  
  ret = [];
  i = context.length;
  while(i--) {
    c = context[i];
    match = evaluate(c, condition.key, condition.operator, condition.value);
    if(match) {
      ret.push(c);
    }
  }
  // console.log(ret);
  
  return ret;
};

Query.build = function(q) {
  q = q instanceof Query ? q : new Query(q);
  return q;
};

module.exports = Query;