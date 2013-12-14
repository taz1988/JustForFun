/**
* This class show the cube on the ui.
* @author Zoltán Kornél Török, taz19880922@gmail.com
**/
function cubeUIClass() { 
    
    this.RED = 0;
    this.YELLOW = 1;
    this.GREEN = 2;
    this.WHITE = 3;
    this.BROWN = 4;
    this.BLUE = 5;

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
                    newSidePart = "<div class='btn btn-default brown'></div>";
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

