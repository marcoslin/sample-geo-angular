angular.module("geoapp")

// Create Map Utilities object
.service("MapUtil", ['DefaultConfig', '$q', '$log', function (DefaultConfig, $q, $log) {
    $log.log("[MapUtil] loaded.");

    // Get Position
    this.getPosition = function (enableHighAccuracyInput, timeout, maximumAge) {
        var d = $q.defer();
        
        options = {
            enableHighAccuracy: enableHighAccuracyInput || DefaultConfig.defaultEnableHighAccuracy,
            timeout: timeout || DefaultConfig.defaultTimeout,
            maximumAge: maximumAge || DefaultConfig.defaultMaximumAge
        };
        
        navigator.geolocation.getCurrentPosition(
            function (position) {
                // On Success
                d.resolve(position);
            },
            function (error) {
                // On Error
                switch (error.code) {
                    case 1: // PERMISSION_DENIED
                        d.reject("geolocation permission denied");
                        break;
                    case 2: // POSITION_UNAVAILABLE
                        d.reject("geolocation unavailable");
                        break;
                    case 3: // TIMEOUT
                        d.reject("geolocation timeout");
                        break;
                    default: // Shouldn't happen
                        d.reject("geolocation unexpected error with code: " + error.code);
                }
            }
        );
        
        return d.promise;
    };
    
    // Expouse Default
    this.DefaultConfig = DefaultConfig;
    
}])

// End
;