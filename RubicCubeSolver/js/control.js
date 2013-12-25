$().ready(function() {
    var cubeUI = new CubeUIClass({ parent : "cube", size : 200});
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
});
