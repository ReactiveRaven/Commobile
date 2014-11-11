angular.module(
        "aa.commobile.service.file",
        [
            "aa.commobile.constants"
        ]
    )
    .factory("FileService", function($http, $q) {
        var FileService;

        FileService = {
            ls: function() {
                var deferred = $q.defer();

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
    });
