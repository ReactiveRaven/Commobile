angular.module("commobile.service.user", [])
    .factory("UserService", function($http, $q) {
        var token,
            UserService;

        UserService = {
            login: function(username, password) {
                var deferred = $q.defer();

                $http({
                    url: "/login",
                    method: "POST",
                    data: {
                        username: username,
                        password: password
                    }
                }).success(function(data) {
                    UserService.setToken(data.token);
                    deferred.resolve();
                }).error(function() {
                    deferred.reject();
                });
                return deferred.promise;
            },
            logout: function() {
                UserService.setToken(null);
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
