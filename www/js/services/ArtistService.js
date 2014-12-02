angular.module("aa.commobile.service.artist", [ "aa.commobile.constants" ])
    .factory(
        "ArtistService",
        function($http, $q, API_HOST, URL_SESSION) {
            var ArtistService = {
                    getList: function() {
                        return $q.defer().promise;
                    }
                };

            return ArtistService;
        }
    );