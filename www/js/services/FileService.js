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
                ls: function(folder) {
                    var params = {};
                    folder = folder || "/";

                    params.firstKey = folder;
                    params.lastKey = folder;

                    return UrlService.render(API_HOST + URL_FILE).then(function(renderedUrl) {
                        return $http.get(
                            renderedUrl,
                            {
                                params: params
                            }
                        ).then(
                            function(result) {
                                return result.data;
                            }
                        );
                    });
                },
                getInfo: function(id) {
                    if (!id) {
                        throw "FileService.getInfo requires a id to get information on";
                    }

                    return UrlService.render(API_HOST + URL_FILE).then(function(renderedUrl) {
                        return $http.get(
                            renderedUrl + "/" + id
                        ).then(function(result) {
                            return result.data;
                        });
                    });
                }
            };

            return FileService;
        }
    );
