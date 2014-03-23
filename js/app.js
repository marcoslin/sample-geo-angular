(function () {

    var app = angular.module("geoapp", ['ngRoute']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/showOpenStreetMap', {
                templateUrl: "views/map.html",
                controller: "OpenStreetMapController"}
            )
            .when('/showGoogleMap', {
                templateUrl: "views/map.html",
                controller: "GoogleMapController"}
            )
            .when('/showHybridMap', {
                templateUrl: "views/map.html",
                controller: "HybridMapController"}
            )
            .otherwise({redirectTo: '/showOpenStreetMap'})
        ;
    }]);
    
    app.constant('DefaultConfig', {
        // Default for Maps
        defaultZoom: 15,
        defaultPosition: {
            coords: {
                longitude: 12.4830619,
                latitude: 41.8932575
            }
        },
        // Default for Geolocation
        defaultEnableHighAccuracy: true,
        defaultTimeout: 8000, // 8 seconds
        defaultMaximumAge: 0 // 0 seconds, no-cache
    });

})();

