angular.module("geoapp")
.controller('GoogleMapController', ['$scope', function ($scope) {
    // Set the form status
    $scope.fs = {
        hideButton: true,
        autocomplete: "off",
        showGoogleMap_class: "active"
    };
    
}]);