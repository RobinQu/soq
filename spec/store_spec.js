/*global describe, jasmine, it, beforeEach */

var Store = require("../lib/store");

describe("Store", function() {
  
  var store;
  
  it("should support interface of adding an element of certain type to a store", function() {
    
    store = new Store();
    store.add({
      "name": "Ford",
      "type": "vehicle"
    }).add({
      "name": "BMW",
      "type": "vehicle"
    }).add({
      "name": "Bike",
      "type": "other"
    });
    
    expect(store.all("vehicle").length).toEqual(2);
    
  });
  
  it("should find items in store by query object", function() {
    
    var r = store.find({
      type: "vehicle",
      conditions: "name BEGINS_WITH 'B'"
    });
    expect(r.length).toEqual(1);
    expect(r[0].name).toEqual("BMW");
    
  });
  
  // it("should update its item of a certain type", function() {
  //   var item = store.find({ type: "vehicle", conditions: "name ='Ford'"});
  //   store.update({name: "Ford!", });
  //   
  // });
  
  it("should remove an item of a certain type from store", function() {
    
    var r = store.find({
      type: "other",
      conditions: "name = 'Bike'"
    });
    // console.log(r);
    
    expect(r.length).toEqual(1);
    store.remove(r[0]);
    expect(store.all("other").length).toEqual(0);
    
  });
  
});