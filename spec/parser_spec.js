/*global describe, jasmine, it, beforeEach */

var parser = require("../lib/parser");

beforeEach(function() {
  this.addMatchers({
    toHaveCondition: function(key, value, operator) {
      var c = this.actual;
      
      if (c.key == key && c.value == value && c.operator == operator) {
        return true;
      }
      return false;
    }
  });
});

describe("Query parser", function() {
  
  it("should recongnize simple equation", function() {
    
    var r = parser.parse("a='x'");
    expect(r).toHaveCondition("a", "x", "=");
  });
  
  it("should reconginize multiple conditions", function() {
    
    var r = parser.parse("a=1 and b='x' or d BEGINS_WITH 'p'");
    
    expect(r.logic).toEqual("OR");
    expect(r.left.left).toHaveCondition("a", 1, "=");
    expect(r.left.logic).toEqual("AND");
    expect(r.left.right).toHaveCondition("b", "x", "=");
    expect(r.right).toHaveCondition("d", "p", "BEGINS_WITH");
    
  });
  
  it("should recongize vairous operators", function() {
    
    var r;
    r = parser.parse("x = 1");
    expect(r).toHaveCondition("x", 1, "=");
    r = parser.parse("x > 1");
    expect(r).toHaveCondition("x", 1,  ">");
    r = parser.parse("x >= 1");
    expect(r).toHaveCondition("x", 1,  ">=");
    r = parser.parse("x < 1");
    expect(r).toHaveCondition("x", 1, "<");
    r = parser.parse("x <= 1");
    expect(r).toHaveCondition("x", 1, "<=");
    r = parser.parse("x != 1");
    expect(r).toHaveCondition("x", 1, "!=");
    r = parser.parse("x BEGINS_WITH '1'");
    expect(r).toHaveCondition("x", "1", "BEGINS_WITH");
    r = parser.parse("x ENDS_WITH '1'");
    expect(r).toHaveCondition("x", "1", "ENDS_WITH");
    r = parser.parse("x CONTAINS '1'");
    expect(r).toHaveCondition("x", "1", "CONTAINS");
    r = parser.parse("x TYPE_IS 'string'");
    expect(r).toHaveCondition("x", "string", "TYPE_IS");
    
  });
  
});