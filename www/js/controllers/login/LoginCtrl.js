angular.module(
        "aa.commobile.controller.login",
        [
            "ui.router",
            "aa.commobile.service.user"
        ]
    )
    .config(function($stateProvider) {
        $stateProvider
            .state("login", {
                url: "/login",
                templateUrl: "js/controllers/login/login.html",
                controller: "LoginCtrl"
            });
    })
    .controller("LoginCtrl", function($scope, UserService, $q, $state) {
        $scope.name = "LoginCtrl";
    
        $scope.loginFailed = null;
        
        $scope.login = function() {
            
            $scope.loginState = null;
            
            UserService.login($scope.username, $scope.password)
                .then(
                    function(result) {
                        $scope.loginFailed = false;
                        $state.go("tabs.home");
                    },
                    function(reason) {
                        $scope.loginFailed = true;
                    }
                );
        };
    });
