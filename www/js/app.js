angular.module(
        "aa.commobile",
        [
            "ionic",
            "aa.commobile.constants",
            "aa.commobile.controller.login"
        ]
    )
    .constant("API_HOST", "")
    .constant("URL_SESSION", "/_session")
    .config(function($urlRouterProvider) {
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise("/login");
    })
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the
            // accessory bar above the keyboard for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    });
