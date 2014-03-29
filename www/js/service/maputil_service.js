angular.module("geoapp")

// Create Map Utilities object
.service("MapUtil", ['DefaultConfig', '$window', '$q', '$log', function (DefaultConfig, $window, $q, $log) {
    $log.log("[MapUtil] loaded.");

    // Get Position
    this.getPosition = function (enableHighAccuracyInput, timeout, maximumAge) {
        $log.log("[MapUtil] enableHighAccuracyInput: ", enableHighAccuracyInput);
        $log.log("[MapUtil] timeout: ", timeout);
        $log.log("[MapUtil] maximumAge: ", maximumAge);
        
        var d = $q.defer();
        
        options = {
            enableHighAccuracy: enableHighAccuracyInput || DefaultConfig.defaultEnableHighAccuracy,
            timeout: parseInt(timeout, 10) || DefaultConfig.defaultTimeout,
            maximumAge: parseInt(maximumAge, 10) || DefaultConfig.defaultMaximumAge
        };
        $log.log("[MapUtil] options: ", options);
        
        navigator.geolocation.getCurrentPosition(
            function (position) {
                // On Success
                d.resolve(position);
            },
            function (error) {
                var msg = error.message;
                $window.alert(msg);
                d.reject(msg);
            },
            options
        );
        
        return d.promise;
    };
    
    // Expouse Default
    this.DefaultConfig = DefaultConfig;
    
}])

// End
;