angular.module("geoapp")
.controller('HybridMapController', ['$scope', 'GoogleMap', 'Geolocation', 'DefaultConfig', '$log', function ($scope, GoogleMap, Geolocation, DefaultConfig, $log) {
    $log.log("[HybridMapController] loaded.");
    // Set the form status
    $scope.fs = {
        hideButton: true,
        autocomplete: "off",
        showHybridMap_class: "active"
    };
    
    // Set default value
    $scope.enableHighAccuracy = DefaultConfig.defaultEnableHighAccuracy;
    
    // Define geoloc
    $scope.getGeolocation = function () {
        Geolocation.getPosition($scope.enableHighAccuracy, $scope.timeout, $scope.maximumAge).then(function (position) {
            $log.log("getPosition: ", position);
        });
    };
    
    // Define search
    function searchAction() {
        GoogleMap.search();
    };
    
    GoogleMap.initHybridMap("mapCanvas");
    GoogleMap.initSearchBox("searchAddress", searchAction);
    
}]);