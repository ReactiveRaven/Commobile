describe("ArtistService", function() {

    var ArtistService,
        API_HOST,
        URL_ARTIST_LIST,
        $httpBackend;

    beforeEach(function() {
        module("aa.commobile.service.artist");
        inject(
            function(
                _ArtistService_, _$httpBackend_,
                _API_HOST_, _URL_ARTIST_LIST_
            ) {
                ArtistService = _ArtistService_;
                API_HOST = _API_HOST_;
                URL_ARTIST_LIST = _URL_ARTIST_LIST_;
                $httpBackend = _$httpBackend_;
            }
        );
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("should be an object", function() {
        expect(typeof ArtistService).toBe("object");
    });

    describe("getList", function() {

        beforeEach(function() {
            $httpBackend.when("GET", URL_ARTIST_LIST).respond(mocks.artists.three);
        });

        it("should be a function", function() {
            expect(typeof ArtistService.getList).toBe("function");
        });

        it("should return a promise", function() {
            var result = ArtistService.getList();
            expect(typeof result).toBe("object");
            expect(typeof result.then).toBe("function");
            flush();
        });

        it("should query the server", function() {
            $httpBackend.expectGET(URL_ARTIST_LIST).respond(mocks.artists.three);
            ArtistService.getList();
            flush();
        });

        it("should resolve with the artist responses", function() {
            var expectedArtists = mocks.artists
                    .three
                    .rows
                    .map(function(item) {
                        return item.doc
                    }),
                flag;
            $httpBackend.expectGET(URL_ARTIST_LIST).respond(mocks.artists.three);
            ArtistService.getList().then(function(result) {
                flag = result;
            });
            expect(flag).toBeUndefined();
            flush();
            expect(flag).toEqual(expectedArtists);
        });

        it("should reject on server error", function() {
            var flag;
            $httpBackend.expectGET(URL_ARTIST_LIST).respond(500);
            ArtistService.getList()
                .then(function() {
                    flag = "resolved";
                }, function() {
                    flag = "rejected";
                });
            expect(flag).toBeUndefined();
            flush();
            expect(flag).toEqual("rejected");
        });
    });

    describe("getArtist", function() {
        var username,
            url;

        beforeEach(function() {
            username = "picasso";
            url = URL_ARTIST_LIST + "?firstKey=" + username + "&lastKey=" + username;
            $httpBackend.when(
                "GET",
                url
            ).respond(mocks.artists.search.picasso);
        });

        it("should be a function", function() {
            expect(typeof ArtistService.getArtist).toBe("function");
        });

        it("should return a promise", function() {
            var result = (
                    ArtistService
                        .getArtist(username)
                );
            expect(typeof result).toBe("object");
            expect(typeof result.then).toBe("function");
            flush();
        });

        it("should query the server", function() {
            $httpBackend
                .expectGET(url)
                .respond(mocks.artists.search[username]);
            ArtistService
                .getArtist(username);
            flush();
        });

        it("should resolve with the artist information", function() {
            var flag;
            ArtistService
                .getArtist(username)
                .then(function(results) {
                    flag = results;
                });
            expect(flag)
                .toBeUndefined();
            flush();
            expect(flag)
                .toEqual(
                    mocks
                        .artists
                        .search[username]
                        .rows[0]
                        .doc
                );
        });

        it("should reject with \"Not found\" if there are no results", function() {
            var flag;
            $httpBackend
                .expectGET(url)
                .respond(mocks.artists.search["not-found"]);
            ArtistService
                .getArtist(username)
                .catch(function(reason) {
                    flag = reason;
                });
            expect(flag)
                .toBeUndefined();
            flush();
            expect(flag)
                .toBe("Not found");
        });

        it("should reject on server error", function() {
            var flag;
            $httpBackend
                .expectGET(url)
                .respond(500);
            ArtistService
                .getArtist(username)
                .catch(function() {
                    flag = "rejected";
                });
            expect(flag)
                .toBeUndefined();
            flush();
            expect(flag)
                .toBe("rejected");
        });

        it("should reject with \"Multiple found\" if multiple are found", function() {
            var flag;
            $httpBackend
                .expectGET(url)
                .respond(mocks.artists.search.multiple);
            ArtistService
                .getArtist(username)
                .catch(function(reason) {
                    flag = reason;
                });
            expect(flag)
                .toBeUndefined();
            flush();
            expect(flag)
                .toBe("Multiple found");
        });
    });

});
