test("MainController init function first initialization", function() {
    var base = {
        getByType : function(type) {
            if (type === "peon") {
                return [{id : "peon1"}];
            } else if (type === "gem") {
                return [{id : "gems"}];
            } else if (type === "gold-coin") {
                return [{id : "gold-coin"}];
            } else if (type === "coin") {
                return [{id : "coin"}];
            }
        }
    }
    mainController.init(base);
    ok(mainController.map != null, "The map should be created");
    ok(mainController.map.base == base, "The map should be contains the base");
    ok(mainController.map.peons.length == 1, "The map should be contains the peons");
    ok(mainController.map.peons[0].id == "peon1", "The map should be contains the peons");
    ok(mainController.map.peonsTargetList.length == 0, "The map peons TargetList should be an empty array!");
    ok(mainController.map.choosedElements.length == 0, "The map choosedElements should be an empty array!");
    ok(mainController.map.moneyItems.gems.length == 1, "There should be one gem!");
    ok(mainController.map.moneyItems.goldCoins.length == 1, "There should be one gold Coin!");
    ok(mainController.map.moneyItems.coins.length == 1, "There should be one coin!");
});

test("MainController init function not first initialization", function() {
    var base = {
        getByType : function(type) {
            if (type === "peon") {
                return [{id : "peon1"}];
            } else if (type === "gem") {
                return [{id : "gems"}];
            } else if (type === "gold-coin") {
                return [{id : "gold-coin"}];
            } else if (type === "coin") {
                return [{id : "coin"}];
            }
        },
        peonsTargetList : [{ id : "peon1" , positions: []}],
        choosedElements : ["coin"]
    }
    mainController.init(base);
    ok(mainController.map != null, "The map should be created");
    ok(mainController.map.base == base, "The map should be contains the base");
    ok(mainController.map.peons.length == 1, "The map should be contains the peons");
    ok(mainController.map.peons[0].id == "peon1", "The map should be contains the peons");
    ok(mainController.map.peonsTargetList.length == 1, "The map peons TargetList should be not an empty array!");
    ok(mainController.map.choosedElements.length == 1, "The map choosedElements should be not an empty array!");
    ok(mainController.map.peonsTargetList[0].id == "peon1", "The map peons TargetList should be not an empty array!");
    ok(mainController.map.peonsTargetList[0].positions.length == 0, "The map peons TargetList should be not an empty array!");
    ok(mainController.map.moneyItems.gems.length == 1, "There should be one gem!");
    ok(mainController.map.moneyItems.goldCoins.length == 1, "There should be one gold Coin!");
    ok(mainController.map.moneyItems.coins.length == 0, "There shouldn't be any coin!");
});

test("MainController init function should remove not exist item references", function() {
    var base = {
        getByType : function(type) {
            if (type === "peon") {
                return [{id : "peon1"}];
            } else if (type === "gem") {
                return [{id : "gems"}];
            } else if (type === "gold-coin") {
                return [{id : "gold-coin"}];
            } else if (type === "coin") {
                return [{id : "coin"}];
            }
        },
        peonsTargetList : [{ id : "peon1" , positions: []}, { id : "peon1" , positions: [{ id : "not exist references"}]}],
        choosedElements : ["coin", "not exist references"]
    }
    mainController.init(base);
    ok(mainController.map != null, "The map should be created");
    ok(mainController.map.base == base, "The map should be contains the base");
    ok(mainController.map.peons.length == 1, "The map should be contains the peons");
    ok(mainController.map.peons[0].id == "peon1", "The map should be contains the peons");
    ok(mainController.map.peonsTargetList.length == 2, "The map peons TargetList should be not an empty array!");
    ok(mainController.map.peonsTargetList[1].positions.length == 0, "Should remove non exist elements");
    ok(mainController.map.choosedElements.length == 1, "The map choosedElements should be not an empty array!");
    ok(mainController.map.peonsTargetList[0].id == "peon1", "The map peons TargetList should be not an empty array!");
    ok(mainController.map.peonsTargetList[0].positions.length == 0, "The map peons TargetList should be not an empty array!");
    ok(mainController.map.moneyItems.gems.length == 1, "There should be one gem!");
    ok(mainController.map.moneyItems.goldCoins.length == 1, "There should be one gold Coin!");
    ok(mainController.map.moneyItems.coins.length == 0, "There shouldn't be any coin!");
});

test("MainController setPeonTargetFinder should call peonTargetFinder init function", function() {
    var called = false; 
    var map = {};
    var peonTargetFinder = {
        init : function(input) {
            called = input === map;
        }
    };
    mainController.map = map;
    mainController.setPeonTargetFinder(peonTargetFinder);
    ok(called === true, "peon target finder should be initialized");
});

test("MainController setPeonController should call peonController init function", function() {
    var called = false; 
    var map = {};
    var peonController = {
        init : function(input) {
            called = input === map;
        }
    };
    mainController.map = map;
    mainController.setPeonController(peonController);
    ok(called === true, "peon controller should be initialized");
});

test("MainController setBuyer   Controller should call buyController init function", function() {
    var called = false; 
    var map = {};
    var buyController = {
        init : function(input) {
            called = input === map;
        }
    };
    mainController.map = map;
    mainController.setBuyerController(buyController);
    ok(called === true, "buy controller should be initialized");
});

test("MainController run call peonController and peonTargetFinder", function() {
    var callPeonController = false;
    var callPeonTargetFinder = false;
    var callBuyerController = false;
    mainController.peonController = {
        movePeons : function() {
            callPeonController = true;
        }
    };
    mainController.peonTargetFinder = {
        find : function() {
            callPeonTargetFinder = true;
        }
    };
    mainController.buyerController = {
        buy : function() {
            callBuyerController = true;
        }
    };
    mainController.run();
    ok(callPeonController == true, "should call peon controller");
    ok(callPeonTargetFinder == true, "should call peon target finder");
    ok(callBuyerController == true, "should call buyer controller");
});
