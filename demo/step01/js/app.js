(function() {
    var app = angular.module("webapp", ['ngRoute']);

    /**
     * Define Routes that binds View to a Controller
     */
    app.config(function ($routeProvider) {
        $routeProvider
        .when("/home", { templateUrl: "view/home.html", controller: "HomeCtrl" })
        .when("/one", { templateUrl: "view/page-one.html", controller: "OneCtrl" })
        .otherwise({redirectTo: "/home"})
    });

    /**
     * Define a Service to be used by Controller
     */
    app.service("SimpleData", function () {
        var now = new Date();
        this.state = now.getSeconds();
        
        // .service automatically returns `this`
    });
    
    /**
     * Create controllers
     */
    app.controller("HomeCtrl", function ($scope, SimpleData) {
        $scope.title = "Home Page";
        $scope.state = SimpleData.state;
    });
    
    app.controller("OneCtrl", function ($scope, SimpleData) {
        $scope.title = "This is Page ONE";
        $scope.state = SimpleData.state;
    });

})();


