angular.module("geoapp")

// Create Map Utilities object
.service("MapUtil", ['DefaultConfig', '$window', '$q', '$log', function (DefaultConfig, $window, $q, $log) {
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
                var msg = error.message;
                $window.alert(msg);
                d.reject(msg);
            }
        );
        
        return d.promise;
    };
    
    // Expouse Default
    this.DefaultConfig = DefaultConfig;
    
}])

// End
;