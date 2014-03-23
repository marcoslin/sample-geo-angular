// Define controller to be used by all pages
angular.module("geoapp")
.controller("MapController", ['$scope', 'MapUtil', 'OpenStreetMap', 'GoogleMap', 'HybridMap', '$log', function ($scope, MapUtil, OpenStreetMap, GoogleMap, HybridMap, $log) {

    // Display the map to be shown
    $scope.showMap = function (mapName) {
        $scope.mapfs = {
            OpenStreetMap_class: "",
            GoogleMap_class: "",
            HybridMap_class: ""
        };
        
        if ( mapName === "openstreetmap" ) {
            $log.log("[MapController] showing openstreetmap");
            $scope.mapfs.OpenStreetMap_class = "active";
        } else if ( mapName === "googlemap" ) {
            $log.log("[MapController] showing googlemap");
            $scope.mapfs.GoogleMap_class = "active";
        } else if ( mapName === "hybridmap" ) {
            $log.log("[MapController] showing hybridmap");
            $scope.mapfs.HybridMap_class = "active";
        }
    };
    
    // Expose getPosition for children $scope
    $scope.getPosition = MapUtil.getPosition;
    
    // Set default value for children $scope
    $scope.enableHighAccuracy = MapUtil.DefaultConfig.defaultEnableHighAccuracy;
        
    // Initialize maps
    OpenStreetMap.initMap("openstreetmap");
    GoogleMap.initMap("googlemap");
    HybridMap.initMap("hybridmap");
}]);