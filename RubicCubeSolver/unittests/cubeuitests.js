test( "hello test", function() {
  ok( 1 == "1", "Passed!" );
});

test("CreateCubeOneSide", function() {
	$("html").append("<div id='test'></div>");
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
	$("#test").remove();
});
