angular.module("geoapp")
.controller('OpenStreetMapController', ['$scope', 'OpenStreetMap', 'Geolocation', 'DefaultConfig', '$window', '$log', function ($scope, OpenStreetMap, Geolocation, DefaultConfig, $window, $log) {
    // Set the form status
    $scope.fs = {
        hideButton: false,
        autocomplete: "on",
        showOpenStreetMap_class: "active",
        map_class: "openstreetmap"
    };

    // Set default value
    $scope.enableHighAccuracy = DefaultConfig.defaultEnableHighAccuracy;
    
    // Define geoloc
    $scope.getGeolocation = function () {
        Geolocation.getPosition($scope.enableHighAccuracy, $scope.timeout, $scope.maximumAge).then(function (position) {
            $log.log("getPosition: ", position);
        });
    };
    
    // Search
    $scope.searchAction = function () {
        if ($scope.searchAddress) {
            OpenStreetMap.search($scope.searchAddress).then(function (data) {
                $scope.searchAddress = data;
            });
        } else {
            $window.alert("Please insert a address");
        }
    };
    
    OpenStreetMap.initMap("mapCanvas");
}]);
