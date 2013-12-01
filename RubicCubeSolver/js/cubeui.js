/**
* This class show the cube on the ui.
* @author Zoltán Kornél Török, taz19880922@gmail.com
**/
function cubeUIClass() { 
    
    var RED = 0;
    var YELLOW = 1;
    var GREEN = 2;
    var WHITE = 3;
    var BROWN = 4;
    var BLUE = 5;

    this.showSide = function (parentElementId, sideValues) {
        var i, j;
        for (i = 0; i < sideValues.length; i++) {
           for (j = 0; j < sideValues[i].length; j++) {
                var newSidePart = null;
                switch (sideValues[i][j]) {
                case this.RED:
                    newSidePart = "<div class='btn btn-danger'></div>";
                    break;
                case this.YELLOW:
                    newSidePart = "<div class='btn btn-warning'></div>";
                    break;
                case this.GREEN:
                    newSidePart = "<div class='btn btn-success'></div>";
                    break;
                case this.WHITE:
                    newSidePart = "<div class='btn btn-default'></div>";
                    break;
                case this.BROWN:
                    newSidePart = "<div class='btn btn-default'></div>";
                    break;
                case this.BLUE:
                    newSidePart = "<div class='btn btn-primary'></div>";
                    break;
                }
                $(parentElementId).append(newSidePart);            
            } 
        }
    }   

    return this;
}

