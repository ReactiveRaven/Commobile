angular.module(
    "aa.commobile.controller.tabs",
    [
        "ui.router"
    ]
)
    .config(function($stateProvider) {
        $stateProvider
            .state("tabs", {
                abstract: true,
                templateUrl: "js/controllers/tabs/tabs.html",
                controller: "TabsCtrl"
            });
    })
    .controller("TabsCtrl", function($scope) {
        
    });