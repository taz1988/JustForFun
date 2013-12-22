/**
* This class show the cube on the ui.
* @author Zoltán Kornél Török, taz19880922@gmail.com
**/
function cubeUIClass(config) { 
    
    this.RED = 0;
    this.YELLOW = 1;
    this.GREEN = 2;
    this.WHITE = 3;
    this.BROWN = 4;
    this.BLUE = 5;
    
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
       this.showSide(this.top, cubeSlides[0], calculatedSize);
       this.showSide(this.left, cubeSlides[1], calculatedSize);
       this.showSide(this.center, cubeSlides[2], calculatedSize);
       this.showSide(this.right, cubeSlides[3], calculatedSize);
       this.showSide(this.bottom, cubeSlides[4], calculatedSize);
    }
    
    this.showSide = function (parentElementId, sideValues, size) {
        var i, j;
        for (i = 0; i < sideValues.length; i++) {
           for (j = 0; j < sideValues[i].length; j++) {
                var newSidePart = null;
                switch (sideValues[i][j]) {
                case this.RED:
                    newSidePart = $("<div class='btn btn-danger'></div>");
                    break;
                case this.YELLOW:
                    newSidePart = $("<div class='btn btn-warning'></div>");
                    break;
                case this.GREEN:
                    newSidePart = $("<div class='btn btn-success'></div>");
                    break;
                case this.WHITE:
                    newSidePart = $("<div class='btn btn-default'></div>");
                    break;
                case this.BROWN:
                    newSidePart = $("<div class='btn btn-default brown'></div>");
                    break;
                case this.BLUE:
                    newSidePart = $("<div class='btn btn-primary'></div>");
                    break;
                }
                newSidePart.appendTo(parentElementId);
                newSidePart.css("width", size + "px");
                newSidePart.css("height", size + "px");
            } 
        }
    }   

    return this;
}

