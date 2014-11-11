angular.module(
        "aa.commobile.service.file",
        [
            "aa.commobile.constants",
            "aa.commobile.service.url"
        ]
    )
    .factory(
        "FileService",
        function(
            $http, $q,
            UrlService,
            API_HOST, URL_FILE
        ) {
            var FileService;

            FileService = {
                ls: function() {
                    var deferred = $q.defer();

                    UrlService.render(API_HOST + URL_FILE).then(function(renderedUrl) {
                        $http.get(renderedUrl).success(
                            
                        );
                    })

                    return deferred.promise;
                },
                getInfo: function(filename) {
                    var deferred = $q.defer();

                    if (!filename) {
                        throw "FileService.getInfo requires a filename to get information on";
                    }



                    return deferred.promise;
                }
            };

            return FileService;
        }
    );
