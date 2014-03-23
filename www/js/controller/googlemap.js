angular.module("geoapp")
.controller('GoogleMapController', ['$scope', 'GoogleMap', '$log', function ($scope, GoogleMap, $log) {
    $log.log("[GoogleMapController] loaded.");
    // Set the form status
    $scope.fs = {
        hideButton: true,
        autocomplete: "off",
    };
    
    // Configure Search
    function searchAction() {
        $log.log("[GoogleMapController] searchAction called.");
        GoogleMap.search();
    };
    
    GoogleMap.initSearchBox("searchAddress", searchAction);
    
    $scope.$on("$destroy", function () {
        $log.log("[GoogleMapController] seachBox cleanup");
        GoogleMap.clearSearchBox();
    });
    
    // Define getGeolocation
    $scope.getGeolocation = function () {
        $scope.getPosition($scope.enableHighAccuracy, $scope.timeout, $scope.maximumAge).then(function (position) {
            GoogleMap.showPosition(position);
        });
    };
    
    // Call showMap defined in the parent MapController
    $scope.showMap("googlemap");
    
}]);