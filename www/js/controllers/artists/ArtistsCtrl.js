angular.module(
    "aa.commobile.controller.artists",
    [
        "ui.router"
    ]
)
    .config(function($stateProvider) {
        $stateProvider
            .state("tabs.artists", {
                url: "/artists",
                views: {
                    "artists-tab": {
                        templateUrl: "js/controllers/artists/artists.html",
                        controller: "ArtistsCtrl"
                    }
                }
            });
    })
    .controller("ArtistsCtrl", function($scope) {

    });