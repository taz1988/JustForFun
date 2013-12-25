/**
* This class show the cube on the ui.
* @author Zoltán Kornél Török, taz19880922@gmail.com
**/
function CubeUIClass(config) { 
   
    this.addNewSlideDiv = function(id, size) {
         var slide = $('<div id="' + id + '" style="width : ' + size + 'px; height : ' + size + 'px;"></div>');
         slide.appendTo(this.parent);
         return slide;
    }
 
    this.init = function (config) {
        if (config != null && typeof config !== "undefined" ) {
            this.parent = $("#" + config.parent);
            this.top = this.addNewSlideDiv("top", config.size);  
            this.left = this.addNewSlideDiv("left", config.size);
            this.center = this.addNewSlideDiv("center", config.size);
            this.right = this.addNewSlideDiv("right", config.size);
            this.bottom = this.addNewSlideDiv("bottom", config.size);
            this.size = config.size;
        }
    }
    this.init(config);

    this.showCube = function (cubeSlides) {
       var calculatedSize = this.size / cubeSlides[0].length;
       this.showSide(this.top, cubeSlides[0], calculatedSize, TOP);
       this.showSide(this.left, cubeSlides[1], calculatedSize, LEFT);
       this.showSide(this.center, cubeSlides[2], calculatedSize, CENTER);
       this.showSide(this.right, cubeSlides[3], calculatedSize, RIGHT);
       this.showSide(this.bottom, cubeSlides[4], calculatedSize, BOTTOM);
    }
    
    this.showSide = function (parentElementId, sideValues, size, sideId) {
        var i, j;
        for (i = 0; i < sideValues.length; i++) {
           for (j = 0; j < sideValues[i].length; j++) {
                var newSidePart = $("<div id='" + sideId + "_" + i + "_" +j +"' onmouseout=\"CubeUIClass.removeDirectionControl('" + sideId + "_" + i + "_" +j +"')\" onclick=\"CubeUIClass.showDirectionControl('" + sideId + "_" + i + "_" +j +"');\" class='btn'></div>");
                newSidePart.appendTo(parentElementId);
                newSidePart.css("width", size + "px");
                newSidePart.css("height", size + "px");
                switch (sideValues[i][j]) {
                case RED:
                    newSidePart.addClass("btn-danger");
                    break;
                case YELLOW:
                    newSidePart.addClass("btn-warning");
                    break;
                case GREEN:
                    newSidePart.addClass("btn-success");
                    break;
                case WHITE:
                    newSidePart.addClass("btn-default");
                    break;
                case BROWN:
                    newSidePart.addClass("btn-default brown");
                    break;
                case BLUE:
                    newSidePart.addClass("btn-primary");
                    break;
                }
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


