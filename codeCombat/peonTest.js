test( "getNearestBiggestElementReturnNull", function() {
  var config = {
  	base : {},
  	peons : [],
  	gems: [],
  	goldCoins : [],
  	coins : []
  };
  var peonController = new PeonController(config);
  var peon = {
  	getNearest : function(){ return null; }
  };
  ok(peonController.getNearestBiggestElement(peon) == null, "Returned null element.");
});

test( "getNearestBiggestElementReturnBiggestGem", function() {
  var config = {
  	base : {},
  	peons : [],
  	gems: ["biggest"],
  	goldCoins : [],
  	coins : []
  };
  var peonController = new PeonController(config);
  var peon = {
  	getNearest : function(items){ 
  		if (items.length > 0) {
  			return items[0];
  		} else {
  			return null;
  		}
  	}
  };
  ok(peonController.getNearestBiggestElement(peon) != null, "Returned biggist gems element.");
});

test( "getNearestBiggestElementReturnBiggestGoldCoins", function() {
  var config = {
  	base : {},
  	peons : [],
  	gems: [],
  	goldCoins : ["biggest"],
  	coins : []
  };
  var peonController = new PeonController(config);
  var peon = {
  	getNearest : function(items){ 
  		if (items.length > 0) {
  			return items[0];
  		} else {
  			return null;
  		}
  	}
  };
  ok(peonController.getNearestBiggestElement(peon) != null, "Returned biggist gold-coin element.");
});

test( "getNearestBiggestElementReturnBiggestCoin", function() {
  var config = {
  	base : {},
  	peons : [],
  	gems: ["biggest"],
  	goldCoins : [],
  	coins : []
  };
  var peonController = new PeonController(config);
  var peon = {
  	getNearest : function(items){ 
  		if (items.length > 0) {
  			return items[0];
  		} else {
  			return null;
  		}
  	}
  };
  ok(peonController.getNearestBiggestElement(peon) != null, "Returned biggist coin element.");
});
