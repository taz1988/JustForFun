$().ready(function() {
    var cubeUI = new cubeUIClass({ parent : "cube", size : 200});
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
    var cube = [side, side, side, side, side];
    cubeUI.showCube(cube);
});
