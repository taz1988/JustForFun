
test("CreateCubeOneSide", function() {
    $("html").append("<div id='test2'></div>");
    var WIDTH = 100;
    var HEIGHT = 100;
    $("#test2").width(WIDTH);
    $("#test2").height(HEIGHT);
    var cubeUI = new CubeUIClass();
    var side = [[],[],[]];
    side[0][0] = RED;
    side[0][1] = WHITE;
    side[0][2] = YELLOW;
    side[1][0] = BLUE;
    side[1][1] = GREEN;
    side[1][2] = BROWN;
    side[2][0] = YELLOW;
    side[2][1] = RED;
    side[2][2] = YELLOW; 
    cubeUI.showSide($("#test2"), side);
    console.log($("#test2").children());
    equal($("#test2").children().length, 9, "The parent div have to 9 child element exactly!");
    equal($("#test2").outerWidth(), WIDTH, "The Width is not good");
    $("#test2").remove();
});

test("testCreateCubeOneSideUseDifferentClassNames", function() {
    $("html").append("<div id='test'></div>");
    var WIDTH = 600;
    var HEIGHT = 600;
    $("#test").width(WIDTH);
        $("#test").height(HEIGHT);
        var cubeUI = new CubeUIClass();
    var side = [[],[],[]];
    side[0][0] = RED;
    side[0][1] = WHITE;
    side[0][2] = YELLOW;
    side[1][0] = BLUE;
    side[1][1] = GREEN;
    side[1][2] = BROWN;
    side[2][0] = YELLOW;
    side[2][1] = RED;
    side[2][2] = YELLOW; 
    redCount = 2;
    whiteCount = 1;
    yellowCount = 3;
    blueCount = 1;
    brownCount = 1;
    greenCount = 1;
    cubeUI.showSide($("#test"), side, 200, "test");
    $("#test").children().each(function() {
        if($(this).hasClass("btn-danger")) {
            redCount--;
        }
        
        if($(this).hasClass("btn-warning")) {
            yellowCount--;
        }

        if($(this).hasClass("btn-success")) {
            greenCount--;
        }

        if($(this).hasClass("btn-default")) {
            whiteCount--;
        }

        if($(this).hasClass("brown")) {
            brownCount--;
            whiteCount++;
        }

        if($(this).hasClass("btn-primary")) {
            blueCount--;
        }

    });
    equal($("#test").children().length, 9, "The parent div have to 9 child element exactly!");
    equal(redCount, 0, "The red class count should be 0!");
    equal(whiteCount, 0, "The white class count should be 0!");
    equal(yellowCount, 0, "The yellow class count should be 0!");
    equal(blueCount, 0, "The blue class count should be 0!");
    equal(brownCount, 0, "The brown class count should be 0!");
    equal(greenCount, 0, "The green class count should be 0!");   
    $("#test").remove();
});

test("draw5Slide", function() {
    $("html").append("<div id='test'></div>");
    var WIDTH = 100;
    var HEIGHT = 100;
    $("#test").width(WIDTH);
    $("#test").height(HEIGHT);
    var cubeUI = new CubeUIClass({ parent : "test", size : 200});
    var side = [[],[],[]];
    side[0][0] = RED;
    side[0][1] = WHITE;
    side[0][2] = YELLOW;
    side[1][0] = BLUE;
    side[1][1] = GREEN;
    side[1][2] = BROWN;
    side[2][0] = YELLOW;
    side[2][1] = RED;
    side[2][2] = YELLOW;
    var cube = [side, side, side, side, side]; 
    cubeUI.showCube(cube);
    //console.log($("#test").children());
    equal($("#test").children().length, 5, "The parent div have to 5 child element exactly!");
    $("#test").children().each(function () {
        equal($(this).children().length, 9, "It should be 9 child!");
    });
    $("#test").remove();
});

test("showControlElements", function() {
    $("html").append("<div id='test'></div>");
    var WIDTH = 100;
    var HEIGHT = 100;
    $("#test").width(WIDTH);
    $("#test").height(HEIGHT);
    var cubeUI = new CubeUIClass({ parent : "test", size : 200});
    var side = [[],[],[]];
    side[0][0] = RED;
    side[0][1] = WHITE;
    side[0][2] = YELLOW;
    side[1][0] = BLUE;
    side[1][1] = GREEN;
    side[1][2] = BROWN;
    side[2][0] = YELLOW;
    side[2][1] = RED;
    side[2][2] = YELLOW;
    var cube = [side, side, side, side, side]; 
    cubeUI.showCube(cube);
    $("#0_0_0").trigger("click"); 
    equal($("#0_0_0").children().length, 4, "It should be 4 control elements!");
    $("#test").remove();
});

test("controlElementsDissapearMouseOutEvent", function() {
    $("html").append("<div id='test'></div>");
    var WIDTH = 100;
    var HEIGHT = 100;
    $("#test").width(WIDTH);
    $("#test").height(HEIGHT);
    var cubeUI = new CubeUIClass({ parent : "test", size : 200});
    var side = [[],[],[]];
    side[0][0] = RED;
    side[0][1] = WHITE;
    side[0][2] = YELLOW;
    side[1][0] = BLUE;
    side[1][1] = GREEN;
    side[1][2] = BROWN;
    side[2][0] = YELLOW;
    side[2][1] = RED;
    side[2][2] = YELLOW;
    var cube = [side, side, side, side, side]; 
    cubeUI.showCube(cube);
    $($($("#test").children()[0]).children()[0]).trigger("click");
    equal($($($("#test").children()[0]).children()[0]).children().length, 4, "It should be 4 control elements!");
    $($($("#test").children()[0]).children()[0]).mouseout(); 
    equal($("#test").children().length, 0, "It should be 0 control elements!");
    $("#test").remove();

});

test("controlElementTriggerEvent", function() {
    $("html").append("<div id='test'></div>");
    var cubeUI = new CubeUIClass();
    CubeUIClass.showDirectionControl("test", TOP, 0, 0);
    equal($("#test").children().length, 4);
    var callCustomEvent = false;
    $(document).on(CHANGE_CUBE_EVENT, function(event){
        callCustomEvent = true;
        equal(event.direction, UP, "The direction should be UP!");
        equal(event.sideId, TOP, "The sideId should be TOP!");
        equal(event.row, 0, "The row value shoud be 0!");
        equal(event.col, 0, "The col value should be 0!");
    }); 
    $($("#test").children()[0]).trigger("click");
    equal(callCustomEvent, true, "It should be call the custom event!");
    $("#test").remove();
});
