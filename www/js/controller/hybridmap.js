angular.module("geoapp")
.controller('HybridMapController', ['$scope', function ($scope) {
    // Set the form status
    $scope.fs = {
        hideButton: true,
        autocomplete: "off",
        showHybridMap_class: "active"
    };
}]);