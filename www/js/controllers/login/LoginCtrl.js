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
    .controller("LoginCtrl", function($scope, UserService) {
        $scope.name = "LoginCtrl";
        // empty
    });
