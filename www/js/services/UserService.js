angular.module('commobile.service.user', [])
    .factory("UserService", function($http, $q) {
        var token,
            UserService;
    
        UserService = {
            login: function() {
                var deferred = $q.defer();
                
                $http({
                    url: "/login",
                    method: "POST",
                    data: {
                        username: null,
                        password: null
                    }
                }).success(function(data) {
                    UserService.setToken(data.token);
                });
                return deferred.promise;
            },
            getToken: function() {
                return token;
            },
            setToken: function(newToken) {
                token = newToken;
                return this;
            }
        };
    
        return UserService;
    });
