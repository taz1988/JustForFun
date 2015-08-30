requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-2.0.3.min',
        three: 'lib/three.min'
    }
});

requirejs(["3dRubicCube"]);
