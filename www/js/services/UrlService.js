angular.module(
        "aa.commobile.service.url",
        [
            "aa.commobile.service.user"
        ]
    )
    .factory(
        "UrlService",
        function(
            UserService,
            $q
        ) {
            var knownServices = {
                    UserService: UserService
                },
                UrlService;

            UrlService = {
                render: function() {
                    var deferred = $q.defer();
                                           
                    return deferred.promise;
                }
            };

            return UrlService;
        }
    );
