(function () {

    var app = angular.module("geoapp", ['ngRoute']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/showOpenStreetMap', { templateUrl: "views/openstreetmap.html", controller: "OpenStreetMapController"} )
            .when('/showGoogleMap', { templateUrl: "views/googlemap.html", controller: "GoogleMapController"} )
            .when('/showHybridMap', { templateUrl: "views/hybridmap.html", controller: "HybridMapController"} )
            .otherwise({redirectTo: '/showOpenStreetMap'})
        ;
    }]);

})();

