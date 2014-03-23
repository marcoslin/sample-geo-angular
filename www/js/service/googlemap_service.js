angular.module("geoapp")

// Define baseMap to be used
.factory('BaseGoogleMap', ['DefaultConfig', '$http', '$q', '$log', function (DefaultConfig, $http, $q, $log) {

    var MapObject = function (name) {
        this.name = name;
        this.map = undefined;
        this.searchBox = undefined;
        this.marker = undefined;
        this.currentPosition = undefined;
        
        this.event_places_changed = undefined;
        this.event_bounds_changed = undefined;
    };
    
    MapObject.prototype = {
        /*
         * initMap
         * Initializes and shows the map
         */
        initMap: function (mapId) {
            $log.log("[" + this.name + "] initializing map on element " + mapId);
            /* Set GoogleMap options */
            var mapOptions = {
                zoom: DefaultConfig.defaultZoom,
            };

            /* Initialize superclass attributes */
            this.map = new google.maps.Map(document.getElementById(mapId), mapOptions);

            /* Show the map */
            var gmPosition = new google.maps.LatLng(DefaultConfig.defaultPosition.coords.latitude, DefaultConfig.defaultPosition.coords.longitude);
            this.map.setCenter(gmPosition);
        },
        
        /*
         * initSearchBox
         * Initialize Google Search Box
         */
        initSearchBox: function (inputId, searchCallback) {
            var self = this;
            $log.log("[" + this.name + "] .initSearchBox for map:", this.map);
            this.searchBox = new google.maps.places.SearchBox(document.getElementById(inputId));

            /* Listen for the event fired when the user selects an item from the pick list. */
            this.event_places_changed = google.maps.event.addListener(this.searchBox, 'places_changed', function() {
                $log.log("[" + self.name + "] .initSearchBox's places_changed event fired.");
                searchCallback();
            });

            /* Bias the SearchBox results towards places that are within the bounds of the current map's viewport. */
            this.event_bounds_changed = google.maps.event.addListener(this.map, 'bounds_changed', function() {
                $log.log("[" + self.name + "] .initSearchBox's bounds_changed event fired.");
                var bounds = self.map.getBounds();
                self.searchBox.setBounds(bounds);
            });
        },
        
        /*
         * Deregister maps events
         */
        clearSearchBox: function () {
            this.event_places_changed.remove();
            this.event_places_changed = undefined;
            
            this.event_bounds_changed.remove();
            this.event_bounds_changed = undefined;
        },
        
        /*
         * search
         * Perform the search based on address choosen in the drop down
         */
        search: function() {
            /* Retrieve the places found and use the first one */
            var places = this.searchBox.getPlaces(),
                place = places[0];

            $log.log("[" + this.name + "] .search called with place: ", place);

            // Clear the previous marker if set
            if (this.marker) {
                this.marker.setMap(null);
            }

            /* Add a marker on the place found */
            this.marker = new google.maps.Marker({
                map: this.map,
                title: place.name,
                position: place.geometry.location
            });

            /* Set the center of the map */
            this.map.setCenter(place.geometry.location);

            /* Display points of interest around the position */
            this.showPOIs(place.geometry.location);
        },
        
        /*
         * showPOIs
         * Show the Points Of Interest around the specified position
         * @param {google.maps.LatLng} position
         */
        showPOIs: function (position) {
            var self = this;
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
                    map: this.map,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                    title: 'Hello World!'
                });

                marker.infowindow = new google.maps.InfoWindow();
                marker.content = 'place ' + i;

                google.maps.event.addListener(marker, 'click', function() {
                    this.infowindow.setContent(this.content);
                    this.infowindow.open(self.map, this);
                });
            }
        },

        /*
         * showPosition
         * Show the specified position on the map
         * @param {Position} position
         */
        showPosition: function(position) {
            /* Retrieve latitude and longitude from Position */
            var plat = position.coords.latitude;
            var plon = position.coords.longitude;

            /* Calculate the Google Maps position */
            var gmPosition = new google.maps.LatLng(plat, plon);

            /* Set the center of the map */
            this.map.setCenter(gmPosition);

            if (typeof this.currentPosition === "undefined") { // if this is the first time this method is invoked

                /* Add a marker to the center */
                x = new google.maps.Marker({
                    position: gmPosition,
                    map: this.map,
                    title: 'Current position'
                });

                /* Show POIs only the first time this method is called */
                this.showPOIs(gmPosition);

                /* Keep track of the current position */
                this.currentPosition = gmPosition;
            }
        }
    };
    
    return MapObject;
    
}])

// Create GoogleMap from BaseGoogleMap
.factory('GoogleMap', ['BaseGoogleMap', '$log', function (BaseGoogleMap, $log) {
    var gmap = new BaseGoogleMap("GoogleMap");
    return gmap;
}])

// Create HybridMap from BaseGoogleMap
.factory('HybridMap', ['BaseGoogleMap', 'DefaultConfig', '$log', function (BaseGoogleMap, DefaultConfig, $log) {
    var gmap = new BaseGoogleMap("HybridMap");
    
    gmap.initMap = function (mapId) {
        $log.log("[" + this.name + "] initializing map on element " + mapId);
        /* Set GoogleMap options */
        var mapOptions = {
            zoom: DefaultConfig.defaultZoom,
            mapTypeId: "OSM",
            mapTypeControl: false, // disable user toggling between map types (such as ROADMAP and SATELLITE)
            streetViewControl: false // disable Google StreetView
        };

        /* Initialize superclass attributes */
        this.map = new google.maps.Map(document.getElementById(mapId), mapOptions);

        /* Define OSM map type pointing at the OpenStreetMap tile server */
        this.map.mapTypes.set("OSM", new google.maps.ImageMapType({
            getTileUrl: function(coord, zoom) {
                return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
            },
            tileSize: new google.maps.Size(256, 256),
            name: "OpenStreetMap",
            maxZoom: 18
        }));
        
        /* Show the map */
        var gmPosition = new google.maps.LatLng(DefaultConfig.defaultPosition.coords.latitude, DefaultConfig.defaultPosition.coords.longitude);
        this.map.setCenter(gmPosition);
    };
    
    return gmap;
}])

// End
;