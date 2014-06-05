test("peonTarget init", function() {
    var map = {id : "id"};
    peonTargetFinder.init(map);
    ok(peonTargetFinder.map == map, "init method should save the map.");
});

test("peonTarget find don't insert new", function() {
    var map = {
        peons : [{
            id : "peon"
        }],
        peonsTargetList : [{
            id : "peon",
            positions : [{}]
        }]
    };
    peonTargetFinder.init(map);
    peonTargetFinder.find();
    ok(peonTargetFinder.map == map, "init method should save the map.");
    ok(map.peonsTargetList.length == 1, "If position exist, shouldn't be insert new!");
});

test("peonTarget find should insert new position from gems", function() {
    var map = {
        peons : [{
            id : "peon",
            getNearest : function (items) {
                if (items.length > 0) {
                    return { 
                        type: "gem", 
                        pos: {}
                        };
                }
                return null;
            }
        }],
        peonsTargetList : [],
        moneyItems : {
            gems : [{ type: "gem", pos: {} }],
            goldCoins : [],
            coins : []
        }
    };
    peonTargetFinder.init(map);
    peonTargetFinder.find();
    ok(peonTargetFinder.map == map, "init method should save the map.");
    ok(map.peonsTargetList.length == 1, "If position exist, should be insert new!");
    ok(map.moneyItems.gems.length == 0, "should be remove choosen item!");
});

test("peonTarget find should insert new position from gold coin", function() {
    var map = {
        peons : [{
            id : "peon",
            getNearest : function (items) {
                if (items.length > 0) {
                    return { 
                        type: "gold-coin", 
                        pos: {}
                        };
                }
                return null;
            }
        }],
        peonsTargetList : [],
        moneyItems : {
            gems : [],
            goldCoins : [{ type: "gold-coin", pos: {} }],
            coins : []
        }
    };
    peonTargetFinder.init(map);
    peonTargetFinder.find();
    ok(peonTargetFinder.map == map, "init method should save the map.");
    ok(map.peonsTargetList.length == 1, "If position exist, should be insert new!");
    ok(map.moneyItems.gems.length == 0, "should be remove choosen item!");
});

test("peonTarget find should insert new position from coins", function() {
    var map = {
        peons : [{
            id : "peon",
            getNearest : function (items) {
                if (items.length > 0) {
                    return { 
                        type: "coin", 
                        pos: {}
                        };
                }
                return null;
            }
        }],
        peonsTargetList : [],
        moneyItems : {
            gems : [],
            goldCoins : [],
            coins : [{ type: "coin", pos: {} }]
        }
    };
    peonTargetFinder.init(map);
    peonTargetFinder.find();
    ok(peonTargetFinder.map == map, "init method should save the map.");
    ok(map.peonsTargetList.length == 1, "If position exist, should be insert new!");
    ok(map.moneyItems.gems.length == 0, "should be remove choosen item!");
});
