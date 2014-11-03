angular.module('commobile.service.user', [])
    .factory("UserService", function($http) {
        return {
            login: function() {
                $http({
                    url: "/login",
                    method: "POST",
                    data: {
                        username: null,
                        password: null
                    }
                });
            },
            getToken: function() {
                return token;
            },
            setToken: function(newToken) {
                token = newToken;
                return this;
            }
        };
    });
