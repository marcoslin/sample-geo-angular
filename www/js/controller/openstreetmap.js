angular.module("geoapp")
.controller('OpenStreetMapController', ['$scope', 'OpenStreetMap', '$window', '$log', function ($scope, OpenStreetMap, $window, $log) {
    // Set the form status
    $scope.fs = {
        hideButton: false,
        autocomplete: "on",
        showOpenStreetMap_class: "active",
        map_class: "openstreetmap"
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
    }
    
    OpenStreetMap.initMap("mapCanvas");
}]);
