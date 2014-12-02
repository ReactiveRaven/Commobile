angular.module("aa.commobile.service.artist", [ "aa.commobile.constants" ])
    .factory(
        "ArtistService",
        function($http, $q, API_HOST, URL_ARTIST_LIST) {
            var ArtistService = {
                    getList: function() {
                        return $http.get(URL_ARTIST_LIST)
                            .then(function(result) {
                                return result.data
                                    .rows
                                    .map(function(item) {
                                        return item.doc;
                                    })
                                ;
                            });
                    },
                    getArtist: function(username) {
                        var deferred = $q.defer();

                        $http.get(
                            URL_ARTIST_LIST + "?firstKey=" + username +
                                "&lastKey=" + username
                        ).then(function(data) {
                            var numRows = data.data.rows.length;
                            if (numRows === 1) {
                                deferred.resolve(data.data.rows[0].doc);
                            } else if (numRows > 1) {
                                deferred.reject("Multiple found");
                            } else {
                                deferred.reject("Not found");
                            }
                        }, deferred.reject);

                        return deferred.promise;
                    }
                };

            return ArtistService;
        }
    );
