angular.module(
    "aa.commobile.controller.home",
    [
        "ui.router",
        "aa.commobile.service.user"
    ]
)
    .config(function($stateProvider) {
        $stateProvider
            .state("tabs.home", {
                url: "/home",
                views: {
                    "home-tab": {
                        templateUrl: "js/controllers/home/home.html",
                        controller: "HomeCtrl"
                    }
                }
            });
    })
    .controller("HomeCtrl", function($scope) {
        
    });
