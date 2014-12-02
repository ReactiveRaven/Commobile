describe("aa.commobile.constants", function() {
    beforeEach(function() {
        module("aa.commobile.constants");
    });

    describe("URL_SESSION", function() {
        it("should be a string", inject(function(URL_SESSION) {
            expect(typeof URL_SESSION).toBe("string");
        }));
    });

    describe("API_HOST", function() {
        it("should be a string", inject(function(API_HOST) {
            expect(typeof API_HOST).toBe("string");
        }));
    });

    describe("URL_FILE", function() {
        it("should be a string", inject(function(URL_FILE) {
            expect(typeof URL_FILE).toBe("string");
        }));
    });

    describe("URL_ARTIST_LIST", function() {
        it("should be a string", inject(function(URL_ARTIST_LIST) {
            expect(typeof URL_ARTIST_LIST).toBe("string");
        }));
    });
});
