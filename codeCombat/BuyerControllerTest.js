test("BuyerController init function", function() {
    var map = {};
    buyerController.init(map);
    ok(buyerController.map === map , "Init function should save map");
});

test("BuyerController build peons", function() {
    var calledBuild = false;
    var map = {
        peons : [],
        base : {
            gold : 50,
            buildables : {
                "peon" : {
                    goldCost : 50
                }
            },
            build : function (type) {
                calledBuild = type == "peon";
            }
        }
    };
    buyerController.map = map;
    buyerController.buy();
    ok(calledBuild == true, "should call build for peon");
});

test("BuyerController build ogres", function() {
    var calledBuild = false;
    var map = {
        peons : [{}, {}, {}],
        base : {
            gold : 100,
            buildables : {
                "ogre" : {
                    goldCost : 50
                }
            },
            build : function (type) {
                calledBuild = type == "ogre";
            }
        }
    };
    buyerController.map = map;
    buyerController.buy();
    ok(calledBuild == true, "should call build for ogre");
});
