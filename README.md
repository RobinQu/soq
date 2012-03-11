#SOQ
**Simple Object Query Interface for JSON Array**

##Synopsis

It's not going to be anther JSON Database. SOQ is made to find pure JSON Objects in a more elegant and unobstructive way. It may be extended to act as middle layer between client and server DB.

##Query Language
We accept a simple string a query conditions. And at least you shuold tell the query object which type of objects you want to find.

	var query = Query.build({
		type: "vehicle",
		conditions: "name = 'Ford'"
	});
	
In fact, the query interface have learned a bunch of condition types:

	* =
	* >=
	* >
	* <=
	* <
	* !=
	* BEGINS_WITH
	* ENDS_WITH
	* MATCH
	* TYPE_IS

And these condition operators are straightfoward.

It also should be noted that the value of a condition can be:

	* Numbers: 1,2,3,0.5,1.4…
	* Strings: "Hello", "Nice",…
	* Reserved Words: true, false, null, undefined
	
What's more you can pass mutiple conditions:

	…
	conditions: "name = 'Ford' and age > 3 or price < 1000"
	…
	
Maybe you are wondering the priority of condtions. Yes, we don't support group conditions with parenthesises currently, which I have added into my TODO list. Anyway, I simply treat the former condition as the one with higher priority for now.

##Store
In most of time, you don't deal with Query class directly. A Store Class is provided as gateway to access your data;

A simple use case:

	var store = new Store();
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

And then, we find what we want in this store:

    var r = store.find({
      type: "vehicle",
      conditions: "name BEGINS_WITH 'B'"
    });
    //result is always in form of an array
    //r[0].name == "BMW"

Also a getting-all-of-we-have method:
	
	var all = store.all("vehicle");
	//all.length === 2

Feel free to modify the objects you find in the store. But in the future, updating a record will be taken seriously with a specialized update method.

Removing a record:
	
	store.remove(r[0]);//BMW is gone from our store!
	
More examples can be found at */spec/*
	
##TODO

	* Data source support for store
	* Group conditions
	* Improving performance of Collection internal
	* Better support for reserved words
	
##Contacts
You can find me:

	* http://robinqu.me/
	* http://twitter.com/robinqu
	* http://weibo.com/robinqu
	