test("peon Controller init function", function() {
    var map = {};
    peonController.init(map);
    ok(map == peonController.map, "init function should save");
});

test("peon Controller movePeons do nothing for empty peons", function() {
    var callBase = false;
    var callGetNearest = false;    
    var map = {
        base : {
            command : function () {
                callBase = true;
            }
        },
        peons : [],
        peonsTargetList : []
    };
    peonController.map = map;
    peonController.movePeons();
    ok(callBase === false, "shouldn't call command");
    ok(callGetNearest === false, "shouldn't call peon get nearest");   
});

test("peon Controller movePeons do nothing for empty peonTargetList", function() {
    var callBase = false;
    var callGetNearest = false;    
    var map = {
        base : {
            command : function () {
                callBase = true;
            }
        },
        peons : [{
            id : "peonId",
            getNearest : function () {
                callGetNearest = true;
            }
        }],
        peonsTargetList : []
    };
    peonController.map = map;
    peonController.movePeons();
    ok(callBase === false, "shouldn't call command");
    ok(callGetNearest === false, "shouldn't call peon get nearest");   
});

test("peon Controller movePeons shouldMove for target", function() {
    var callBase = false;
    var callGetNearest = false;    
    var map = {
        base : {
            command : function () {
                callBase = true;
            }
        },
        peons : [{
            id : "peonId",
            getNearest : function () {
                callGetNearest = true;
            }
        }],
        peonsTargetList : [{
            id : "peonId",
            positions : [{}]        
        }]
    };
    peonController.map = map;
    peonController.movePeons();
    ok(callBase === true, "should call command");
    ok(callGetNearest === true, "should call peon get nearest");   
});
