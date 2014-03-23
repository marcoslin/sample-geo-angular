angular.module("geoapp")
.controller('GoogleMapController', ['$scope', 'GoogleMap', 'Geolocation', 'DefaultConfig', '$log', function ($scope, GoogleMap, Geolocation, DefaultConfig, $log) {
    // Set the form status
    $scope.fs = {
        hideButton: true,
        autocomplete: "off",
        showGoogleMap_class: "active"
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
    
    GoogleMap.initMap("mapCanvas");
    GoogleMap.initSearchBox("searchAddress", searchAction);
    
}]);