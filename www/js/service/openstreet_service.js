angular.module("geoapp")
.service('OpenStreetMap', ['DefaultConfig', '$http', '$q', '$log', function (DefaultConfig, $http, $q, $log) {
    var self = this,
        map, mapnik,
        fromProjection, toProjection,
        markers;
    
    /*
     * initMap
     * Initializes and shows the map
     */
    this.initMap = function(mapId) {

        /* Initialize superclass attributes */
        map = new OpenLayers.Map(mapId);

        /* Initialize OpenStreetMapViewController attributes */
        mapnik = new OpenLayers.Layer.OSM(); // This layer allows accessing OpenStreetMap tiles
        fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
        toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection        
        markers = new OpenLayers.Layer.Markers("Markers");

        /* Add layers */
        map.addLayer(mapnik);
        map.addLayer(markers);

        /* Show the map */
        var osmPosition = new OpenLayers.LonLat(DefaultConfig.defaultPosition.coords.longitude, DefaultConfig.defaultPosition.coords.latitude).transform(fromProjection, toProjection);
        map.setCenter(osmPosition, DefaultConfig.defaultZoom);
    };
    
    /*
     * search
     * Perform the search based on the specified query
     * @param {String} query
     */
    this.search = function (query) {
        //$log.log("Search called with query: ", query);
        var url = 'http://nominatim.openstreetmap.org/?q=' + query + '&format=json&callback=JSON_CALLBACK',
            d = $q.defer();
        
        // Define Success Action
        function successAction(response) {
            $log.log("Search data:", response[0]);
            
            /* Take the first result and get geo infos */
            var rlon = parseFloat(response[0].lon),
                rlat = parseFloat(response[0].lat),
                position = new OpenLayers.LonLat(rlon, rlat).transform(fromProjection, toProjection),
                marker = new OpenLayers.Marker(position);


            /* Set the center of the map */
            map.setCenter(position);

            /* Add a marker on the place found */
            markers.addMarker(marker);

            /* Display points of interest around the position */
            self.showPOIs(new OpenLayers.LonLat(rlon, rlat));

            /* Print place found */
            d.resolve(response[0].display_name);
        }
        
        // Define Error Action
        function errorAction(data, status, headers, config ) {
            $log.error("[OpenStreetMap] .search Error: ", data);
            d.reject("Failed on Open Street Map address search.");
        }
        
        // Invoke GET action
        $http.get(url)
            .success(successAction)
            .error(errorAction)
        
        return d.promise;
    };
    

    /*
     * showPOIs
     * Show the Points Of Interest around the specified position
     * @param {OpenLayers.LonLat} position
     */
    this.showPOIs = function(position) {
        /* Retrieve longitude and latitude from OpenLayers.LonLat */
        var plon = parseFloat(position.lon),
            plat = parseFloat(position.lat);

        /* Show random positioned markers */
        for (var i = 0; i < 10; i++) {
            var lon = plon + (Math.random() * 0.01) - 0.005,
                lat = plat + (Math.random() * 0.01) - 0.005,
                mposition = new OpenLayers.LonLat(lon, lat).transform(fromProjection, toProjection),
                markerIcon = new OpenLayers.Icon('http://openlayers.org/api/img/marker-green.png'),
                marker = new OpenLayers.Marker(mposition, markerIcon);

            marker.popup = new OpenLayers.Popup.FramedCloud("osmpopup",
                mposition,
                new OpenLayers.Size(200, 200),
                "place " + i,
                null,
                true
            );

            marker.events.register("click", marker, function(e) {
                map.addPopup(this.popup);
            });

            markers.addMarker(marker);
        }

    }
    
}]);
