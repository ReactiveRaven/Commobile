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
                }).error(function() {
                    deferred.reject();
                });
                return deferred.promise;
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
