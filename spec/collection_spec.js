/*global describe, jasmine, it, beforeEach */

var Collection = require("../lib/collection");

describe("Collection", function() {
  
  var c;
  
  it("should add content to itself", function() {
    
    c = Collection.create();
    c.add({
      "id": 1,
      "foo": "bar"
    }).add({
      "id": 2,
      "foo": "cow"
    });
    
    // console.log(c);
    
    
    expect(c.length).toEqual(2);
    
  });
  
  it("should find items by query object", function() {
    
    var r = c.find({
      conditions: "foo BEGINS_WITH 'b'"
    });
    
    expect(r.length).toEqual(1);
    expect(r[0].foo).toEqual("bar");
    // console.log(r);
    
    
  });
  
  it("should get the collection by given type name", function() {
    
    var anonymous = Collection.get();//Anonymous type: Type *
    expect(c.length).toEqual(2);//because of what we have done previously
    
    var fixtures = Collection.create("fixtures");
    fixtures.add({
      "id": 1,
      "name": "karl"
    });
    fixtures.add({
      "id": 2,
      "name": "daily"
    });
    fixtures.add({
      "id": 3,
      "name": "tom"
    });
    // console.log(fixtures);
    
    expect(fixtures.length).toEqual(3);
    
  });
  
  it("should remove its content", function() {
    
    var item = c.find({
      conditions: "foo CONTAINS 'b'"
    })[0];
    c.remove(item);
    expect(c.length).toEqual(1);
    
  });
  
});