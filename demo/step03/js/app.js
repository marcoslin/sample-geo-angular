(function() {
    var app = angular.module("webapp", ['ngRoute']);

    /**
     * UNCHANGED
     * Define Routes that binds View to a Controller
     */
    app.config(function ($routeProvider) {
        $routeProvider
        .when("/home", { templateUrl: "view/home.html", controller: "HomeCtrl" })
        .when("/one", { templateUrl: "view/page-one.html", controller: "OneCtrl" })
        .otherwise({redirectTo: "/home"})
    });

    
    /**
     * CHANGED .state to become a counter and added .add method
     * Define a Service to be used by Controller
     */
    app.service("SimpleData", function () {
        this.state = 0;
        
        this.add = function () {
            this.state += 1;
        }
        
        // .service automatically retunr `this`
    });
    
    /**
     * NEW Root Controller.  Set initial state and update it when .add is called.
     */
    app.controller("RootCtrl", function ($scope, SimpleData) {
        $scope.rootMessage = "scope_id " + $scope.$id;
        $scope.state = SimpleData.state;
        
        $scope.add = function () {
            SimpleData.add();
            $scope.state = SimpleData.state;
        }
    });

    /**
     * NEW: No longer injecting SimpleData
     * Create controllers
     */
    app.controller("HomeCtrl", function ($scope) {
        $scope.message = "scope_id " + $scope.$id;
        $scope.title = "Home Page";
    });
    
    app.controller("OneCtrl", function ($scope) {
        $scope.message = "scope_id " + $scope.$id;
        $scope.title = "This is Page ONE";
    });

})();


