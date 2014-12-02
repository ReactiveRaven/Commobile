describe("ArtistService", function() {

    var ArtistService,
        API_HOST,
        URL_SESSION,
        $httpBackend;

    beforeEach(function() {
        module("aa.commobile.service.artist");
        inject(function(_ArtistService_, _API_HOST_, _URL_SESSION_, _$httpBackend_) {
            ArtistService = _ArtistService_;
            API_HOST = _API_HOST_;
            URL_SESSION = _URL_SESSION_;
            $httpBackend = _$httpBackend_;
//             $httpBackend.when("get", URL_SESSION)
//                 .respond({ ok: true }, { "Set-Cookie": "AuthSession=" + token });
        });
    });

    it("should be an object", function() {
        expect(typeof ArtistService).toBe("object");
    });

    describe("getList", function() {
        it("should be a function", function() {
            expect(typeof ArtistService.getList).toBe("function");
        });

        it("should return a promise", function() {
            var result = ArtistService.getList();
            expect(typeof result).toBe("object");
            expect(typeof result.then).toBe("function");
        });
    });

});
