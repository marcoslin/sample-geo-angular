angular.module("geoapp")
.controller('GoogleMapController', ['$scope', 'GoogleMap', '$log', function ($scope, GoogleMap, $log) {
    // Set the form status
    $scope.fs = {
        hideButton: true,
        autocomplete: "off",
        showGoogleMap_class: "active"
    };
    
    
    // Define search
    function searchAction() {
        $log.log("Search called");
    };
    
    GoogleMap.initMap("mapCanvas");
    GoogleMap.initSearchBox("searchAddress", searchAction);
}]);