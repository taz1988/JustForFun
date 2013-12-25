/**
* This class show the cube on the ui.
* @author Zoltán Kornél Török, taz19880922@gmail.com
**/
function CubeUIClass(config) { 
   
    this.addNewSideDiv = function(id, size) {
         var side = $('<div id="' + id + '" style="width : ' + size + 'px; height : ' + size + 'px;"></div>');
         side.appendTo(this.parent);
         return side;
    }
 
    this.init = function (config) {
        if (config != null && typeof config !== "undefined" ) {
            this.parent = $("#" + config.parent);
            this.top = this.addNewSideDiv("top", config.size);  
            this.left = this.addNewSideDiv("left", config.size);
            this.center = this.addNewSideDiv("center", config.size);
            this.right = this.addNewSideDiv("right", config.size);
            this.bottom = this.addNewSideDiv("bottom", config.size);
            this.size = config.size;
        }
    }
    this.init(config);

    this.showCube = function (cubeSides) {
       var calculatedSize = this.size / cubeSides[0].length;
       this.showSide(this.top, cubeSides[0], calculatedSize, TOP);
       this.showSide(this.left, cubeSides[1], calculatedSize, LEFT);
       this.showSide(this.center, cubeSides[2], calculatedSize, CENTER);
       this.showSide(this.right, cubeSides[3], calculatedSize, RIGHT);
       this.showSide(this.bottom, cubeSides[4], calculatedSize, BOTTOM);
    }
    
    this.showSide = function (parentElementId, sideValues, size, sideId) {
        var i, j;
        for (i = 0; i < sideValues.length; i++) {
           for (j = 0; j < sideValues[i].length; j++) {
                            } 
        }
    }   

    return this;
}

CubeUIClass.removeDirectionControl = function(parentId) {
    $("#" + parentId).html("");
}

CubeUIClass.showDirectionControl = function(parentId) {
    var parent = $("#" + parentId);
    $("<span class='glyphicon glyphicon-chevron-up' onclick='CubeUIClass.sendCubeChangeEvent(" + UP + ",\"" + parentId + "\")'></span>").appendTo(parent);
    $("<span class='glyphicon glyphicon-chevron-left' onclick='CubeUIClass.sendCubeChangeEvent(" + LEFT + ",\"" + parentId + "\")'></span>").appendTo(parent);
    $("<span class='glyphicon glyphicon-chevron-rigth' onclick='CubeUIClass.sendCubeChangeEvent(" + RIGHT + ",\"" + parentId + "\")'></span>").appendTo(parent);
    $("<span class='glyphicon glyphicon-chevron-down' onclick='CubeUIClass.sendCubeChangeEvent(" + DOWN + ",\"" + parentId + "\")'></span>").appendTo(parent);
}

CubeUIClass.sendCubeChangeEvent = function(direction, parentId) {
    var data = parentId.split("_");
    $.event.trigger({
        type : CHANGE_CUBE_EVENT,
        direction : direction,
        sideId : data[0],
        row : data[1],
        col : data[2]
   });
   $("#"+parentId).html("");
}

/**
* This class represent one side of the cube
* @id the side identifier: TOP, BOTTOM, LEFT, RIGHT, CENTER
**/
function SideUIClass(id, size) {
    this.id = id;
    this.size = size;

    this.validateArray = function(squareColors){
         if (typeof squareColors.length === "undefined" || squareColors.length == 0 || typeof squareColors[0].length === "undefined" || squareColors[0].length != squareColors.length) {
            throw "the input should be a symetric matrix!";
        }
    }

    this.toHTML = function(squareColors) {
        this.validateArray(squareColors);
        var side = $('<div id="' + this.id + '"></div>');
        
        return side;
    } 

    return this;
}

/** 
* This class is the base building block for the cube. This class reprecent a square which is part of a cube side.
*
* @color it's a constant value, contains the square value.
* @row the row positon where the squre positioning on the side.
* @col similar as the row.
* @size the width and height size in px
**/
function SquareUIClass(color, row, col, size) {
    this.color = color;
    this.row = row;
    this.col = col;
    this.size = size;

    this.addColor = function(square) {
        switch (this.color) {
        case RED:
            square.addClass("btn-danger");
            break;
        case YELLOW:
            square.addClass("btn-warning");
            break;
        case GREEN:
            square.addClass("btn-success");
            break;
        case WHITE:
            square.addClass("btn-default");
            break;
        case BROWN:
            square.addClass("btn-default brown");
            break;
        case BLUE:
            square.addClass("btn-primary");
            break;
        }
    }

    this.toHTML = function() {
        var square = $("<div class='btn'></div>");
        square.css("width", this.size + "px");
        square.css("height", this.size + "px");
        this.addColor(square);
        return square;
    }

    return this;
}
