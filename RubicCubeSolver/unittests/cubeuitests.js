test( "hello test", function() {
  ok( 1 == "1", "Passed!" );
});

test("CreateCubeOneSide", function() {
	$("html").append("<div id='test'></div>");
	var WIDTH = 100;
	var HEIGHT = 100;
	$("#test").width(WIDTH);
    $("#test").height(HEIGHT);
    var cubeUI = new cubeUIClass();
	var side = [[],[],[]];
	side[0][0] = cubeUI.RED;
	side[0][1] = cubeUI.WHITE;
	side[0][2] = cubeUI.YELLOW;
	side[1][0] = cubeUI.BLUE;
	side[1][1] = cubeUI.GREEN;
	side[1][2] = cubeUI.BROWN;
	side[2][0] = cubeUI.YELLOW;
	side[2][1] = cubeUI.RED;
	side[2][2] = cubeUI.YELLOW;	
	cubeUI.showSide("#test", side);
	console.log($("#test").children());
	equal($("#test").children().length, 9, "The parent div have to 9 child element exactly!");
	equal($("#test").outerWidth(), WIDTH, "The Width is not good");
	$("#test").remove();
});

test("testCreateCubeOneSideUseDifferentClassNames", function() {
	$("html").append("<div id='test'></div>");
	var WIDTH = 600;
	var HEIGHT = 600;
	$("#test").width(WIDTH);
        $("#test").height(HEIGHT);
        var cubeUI = new cubeUIClass();
	var side = [[],[],[]];
	side[0][0] = cubeUI.RED;
	side[0][1] = cubeUI.WHITE;
	side[0][2] = cubeUI.YELLOW;
	side[1][0] = cubeUI.BLUE;
	side[1][1] = cubeUI.GREEN;
	side[1][2] = cubeUI.BROWN;
	side[2][0] = cubeUI.YELLOW;
	side[2][1] = cubeUI.RED;
	side[2][2] = cubeUI.YELLOW;	
	redCount = 2;
	whiteCount = 1;
	yellowCount = 3;
	blueCount = 1;
	brownCount = 1;
	greenCount = 1;
	cubeUI.showSide("#test", side);
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
	equal(redCount, 0, "The class count should be 0!");
	equal(whiteCount, 0, "The class count should be 0!");
	equal(yellowCount, 0, "The class count should be 0!");
	equal(blueCount, 0, "The class count should be 0!");
	equal(brownCount, 0, "The class count should be 0!");
	equal(greenCount, 0, "The class count should be 0!");	
   	$("#test").remove();
});
