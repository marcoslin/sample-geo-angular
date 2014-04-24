// Declare addPOI function
var addPOI;

// Initialize Map
(function () {
    /**
     * Initialize Map
     */
    var gmaps =  window.google.maps,
        
        // Define coordinate for Colosseum
        lat = 41.8902,
        lng = 12.4923,
        latLng = new gmaps.LatLng(lat, lng);
    
        // Set Map Options
        mapOptions = {
            zoom: 15,
        },
            
        // Create Map
        map = new gmaps.Map(document.getElementById("map-canvas"), mapOptions),
            
        // Create a InfoWindow
        infoW = new google.maps.InfoWindow(),
        markerCounter = 0;
    
    // Show map on screen
    map.setCenter(latLng);
    
    /**
     * Define showPOI function
     */
    addPOI = function () {
        // Increment markerCounter
        markerCounter += 1;
        
        // Generate a random position
        var llng = lng + (Math.random() * 0.01) - 0.005,
            llat = lat + (Math.random() * 0.01) - 0.005,
            randomPos = new gmaps.LatLng(llat, llng),

            // Create and Show Marker
            marker = new gmaps.Marker({
                position: randomPos,
                map: map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                title: 'POI ' + markerCounter
            });
        
        // Listen to click event on Marker
        gmaps.event.addListener(marker, 'click', function() {
            infoW.setContent(this.title);
            infoW.open(map, this);
        });
    };
    
})();

