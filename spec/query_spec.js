/*global describe, jasmine, it, beforeEach */

var Query = require("../lib/query");

describe("Query", function() {
  
  it("should interpolate conditions with given paramters", function() {
    
    var q = Query.build({
      conditions: "foo={bar}",
      parameters: {bar: "cow"}
    });
    expect(q).toBeTruthy();
    expect(q.conditions[0].value).toEqual("cow");
  });
  
  it("should find against given condition in the context", function() {
    var ctx = [{
      id:1,
      foo: "ac"
    },
    {
      id:2,
      foo: "bc"
    },
    {
      id:3,
      foo: "d"
    },
    {
      id:4,
      foo: "d"
    }];
    
    var q1 = Query.build({
      conditions: "foo='d'"
    });
    var result = Query.find(q1.conditions[0], ctx);
    expect(result.length).toEqual(2);
    expect(result[0].id).toEqual(4);
    
    var q2 = Query.build({
      conditions: "foo BEGINS_WITH 'a'"
    });
    result = Query.find(q2.conditions[0], ctx);
    expect(result.length).toEqual(1);
    expect(result[0].id).toEqual(1);
  });
  
  
  
});