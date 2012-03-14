/*global describe, jasmine, it, beforeEach */

var Collection = require("../lib/collection");

describe("Collection", function() {
  
  var c;
  
  // it("should add content to itself", function() {
  //   
  //   c = Collection.create();
  //   c.add({
  //     "id": 1,
  //     "foo": "bar"
  //   }).add({
  //     "id": 2,
  //     "foo": "cow"
  //   }).add({
  //     "id": 3,
  //     "foo": "coo"
  //   });
  //   
  //   // console.log(c);
  //   expect(c.length).toEqual(3);
  //   
  // });
  // 
  // it("should find items by query object", function() {
  //   
  //   var r = c.find({
  //     conditions: "foo BEGINS_WITH 'c' AND foo CONTAINS 'w'"
  //   });
  //   
  //   expect(r.length).toEqual(1);
  //   expect(r[0].foo).toEqual("cow");
  //   // console.log(r);
  //   
  //   
  // });
  // 
  // it("should get the collection by given type name", function() {
  //   
  //   var anonymous = Collection.get();//Anonymous type: Type *
  //   expect(c.length).toEqual(3);//because of what we have done previously
  //   
  //   var fixtures = Collection.create("fixtures");
  //   fixtures.add({
  //     "id": 1,
  //     "name": "karl"
  //   });
  //   fixtures.add({
  //     "id": 2,
  //     "name": "daily"
  //   });
  //   fixtures.add({
  //     "id": 3,
  //     "name": "tom"
  //   });
  //   // console.log(fixtures);
  //   
  //   expect(fixtures.length).toEqual(3);
  //   
  // });
  // 
  // it("should remove its content", function() {
  //   
  //   var item = c.find({
  //     conditions: "foo CONTAINS 'b'"
  //   })[0];
  //   c.remove(item);
  //   expect(c.length).toEqual(2);
  //   
  // });
  
  it("shold support group condition", function() {
    
    var ani = Collection.create("animals");
    ani.add({
      id: 1,
      name: "Dog"
    }).add({
      id: 2,
      name: "Kitten"
    }).add({
      id: 3,
      name: "Lion"
    }).add({
      id: 4,
      name: "Eagle"
    }).add({
      id: 5,
      name: "Rat"
    }).add({
      id: 6,
      name: "Lizard"
    });
    var ret = ani.find({
      conditions: "name BEGINS_WITH 'L' && (name CONTAINS 'o' or name ENDS_WITH 'e')"
    });
    expect(ret.length).toEqual(1);
    
  });
  
});