angular.module("geoapp")
.service('GoogleMap', ['DefaultConfig', '$http', '$q', '$log', function (DefaultConfig, $http, $q, $log) {
    var self = this,
        maps, searchBox, marker
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
    
    /*
     * search
     * Perform the search based on address choosen in the drop down
     */
    this.search = function() {
        /* Retrieve the places found and use the first one */
        var places = searchBox.getPlaces(),
            place = places[0];
        
        // Clear the previous marker if set
        if (marker) {
            marker.setMap(null);
        }
        
        /* Add a marker on the place found */
        marker = new google.maps.Marker({
            map: map,
            title: place.name,
            position: place.geometry.location
        });

        /* Set the center of the map */
        map.setCenter(place.geometry.location);

        /* Display points of interest around the position */
        self.showPOIs(place.geometry.location);
    };
    
    /*
     * showPOIs
     * Show the Points Of Interest around the specified position
     * @param {google.maps.LatLng} position
     */
    this.showPOIs = function (position) {
        //$log.log("Show POI called with ", position.lat());
        /* Retrieve latitude and longitude from google.maps.LatLng */
        var plat = parseFloat(position.lat());
        var plon = parseFloat(position.lng());

        /* Show random positioned markers */
        for (var i = 0; i < 10; i++) {
            var lon = plon + (Math.random() * 0.01) - 0.005;
            var lat = plat + (Math.random() * 0.01) - 0.005;
            var mposition = new google.maps.LatLng(lat, lon);

            var marker = new google.maps.Marker({
                position: mposition,
                map: map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                title: 'Hello World!'
            });

            marker.infowindow = new google.maps.InfoWindow();
            marker.content = 'place ' + i;

            google.maps.event.addListener(marker, 'click', function() {
                this.infowindow.setContent(this.content);
                this.infowindow.open(map, this);
            });
        }
    }
    
}]);