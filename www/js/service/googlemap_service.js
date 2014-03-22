angular.module("geoapp")
.service('GoogleMap', ['DefaultConfig', '$http', '$q', '$log', function (DefaultConfig, $http, $q, $log) {
    var self = this,
        maps, searchBox
    ;
    
    /*
     * initMap
     * Initializes and shows the map
     */
    this.initMap = function(mapId) {        
        /* Set GoogleMap options */
        var mapOptions = {
            zoom: DefaultConfig.defaultZoom,
        };

        /* Initialize superclass attributes */
        map = new google.maps.Map(document.getElementById(mapId), mapOptions);

        /* Show the map */
        var gmPosition = new google.maps.LatLng(DefaultConfig.defaultPosition.coords.latitude, DefaultConfig.defaultPosition.coords.longitude);
        map.setCenter(gmPosition);
    };
    
    /*
     * initSearchBox
     * Initialize Google Search Box
     */
    this.initSearchBox = function(inputId, searchCallback) {
        searchBox = new google.maps.places.SearchBox(document.getElementById(inputId));

        /* Listen for the event fired when the user selects an item from the pick list. */
        google.maps.event.addListener(searchBox, 'places_changed', function() {
            searchCallback();
        });

        /* Bias the SearchBox results towards places that are within the bounds of the current map's viewport. */
        google.maps.event.addListener(map, 'bounds_changed', function() {
            var bounds = map.getBounds();
            searchBox.setBounds(bounds);
        });
    };
    
}]);