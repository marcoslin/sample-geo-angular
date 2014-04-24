(function() {
    var app = angular.module("webapp", ['ngRoute']);

    /**
     * Define Routes that binds View to a Controller
     */
    app.config(function ($routeProvider) {
        $routeProvider
        .when("/home", { templateUrl: "view/home.html", controller: "HomeCtrl" })
        .otherwise({redirectTo: "/home"})
    });

    
    /**
     * Define a Service to be used by Controller
     */
    app.factory("ComplexData", function ($q, $timeout) {
        var complexObj = function () {};
        
        // Reply with message after waitMSecs
        complexObj.prototype.get = function (message, waitMSecs) {
            var d = $q.defer();
            
            message = message || "Message from ComplexData";
            waitMSecs = waitMSecs || 500;
            
            $timeout(function () {
                d.resolve(message);
            }, waitMSecs);

            return d.promise;
        };
        
        // Raise Error
        complexObj.prototype.error = function (errMessage) {
            var d = $q.defer(),
                waitMSecs = 500;
            
            errMessage = errMessage || "Error Message";
            
            $timeout(function () {
                d.reject(errMessage);
            }, waitMSecs);

            return d.promise;
        }
        
        
        return new complexObj();
        
    });
    

    /**
     * NEW: No longer injecting SimpleData
     * Create controllers
     */
    app.controller("HomeCtrl", function ($scope, ComplexData) {
        $scope.getData = function () {
            $scope.messages = [];
            $scope.errorMessage = "";
            
            ComplexData.get("Very first message").then(function (message) {
                $scope.messages.push(message);
                return ComplexData.error("An Expected Error");
                // return ComplexData.get("Second message with a fast follow up", 1000);
            }).then(function (message) {
                $scope.messages.push(message);
                return "A fast follow message without promise";
            }).then(function (message) {
                $scope.messages.push(message);
                return ComplexData.get("The Final Message", 2000);
            }).then(function (message) {
                $scope.messages.push(message);
                return ComplexData.error("An Expected Error");
            }).catch(function (message) {
                $scope.errorMessage = message;
            });
        };

    });

})();


