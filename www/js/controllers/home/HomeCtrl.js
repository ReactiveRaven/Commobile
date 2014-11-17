angular.module(
        "aa.commobile.controller.home",
        [
            "ui.router",
            "aa.commobile.service.user"
        ]
    )
    .config(function($stateProvider) {
        $stateProvider
            .state("home", {
                url: "/home",
                templateUrl: "js/controllers/home/home.html",
                controller: "HomeCtrl"
            });
    })
    .controller("HomeCtrl", function($scope) {
        
    });
