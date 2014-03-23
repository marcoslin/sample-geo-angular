angular.module("geoapp")
.controller('HybridMapController', ['$scope', 'HybridMap', '$log', function ($scope, HybridMap, $log) {
    $log.log("[HybridMapController] loaded.");
    // Set the form status
    $scope.fs = {
        hideButton: true,
        autocomplete: "off"
    };
    
    // Configure Search
    function searchAction() {
        HybridMap.search();
    };
    HybridMap.initSearchBox("searchAddress", searchAction);
    
    // Define getGeolocation
    $scope.getGeolocation = function () {
        $scope.getPosition($scope.enableHighAccuracy, $scope.timeout, $scope.maximumAge).then(function (position) {
            HybridMap.showPosition(position);
        });
    };
    
    // Call showMap defined in the parent MapController
    $scope.showMap("hybridmap");
}]);