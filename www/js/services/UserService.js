angular.module("aa.commobile.service.user", [ "aa.commobile.constants" ])
    .factory("UserService", function($http, $q, API_HOST, URL_SESSION) {
        var token,
            UserService;

        UserService = {
            login: function(username, password) {
                var deferred = $q.defer();

                $http({
                    url: API_HOST + URL_SESSION,
                    method: "POST",
                    data: {
                        username: username,
                        password: password
                    }
                }).success(function(data) {
                    deferred.resolve();
                }).error(function(reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            },
            getContext: function() {
                var deferred = $q.defer();

                $http({
                    url: API_HOST + URL_SESSION,
                    method: "GET"
                }).success(function(data) {
                    deferred.resolve(data.userCtx);
                }).error(function() {
                    deferred.reject();
                });

                return deferred.promise;
            },
            getUsername: function() {
                return UserService.getContext().then(function(data) {
                    return data.userCtx.name;
                });
            },
            logout: function() {
                return $http({
                    url: API_HOST + URL_SESSION,
                    method: "DELETE"
                });
            }
        };

        return UserService;
    });
