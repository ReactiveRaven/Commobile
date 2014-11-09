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

            }
        };

        return FileService;
    });
