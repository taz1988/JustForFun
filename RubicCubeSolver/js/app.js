requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-2.0.3.min',
        three: 'lib/three.min'
    }
});

define(["jquery", "3dRubicCube"], function(jQuery, RubicCube3d) {
    jQuery(document).ready(function(){
        RubicCube3d.init();
    });
});
