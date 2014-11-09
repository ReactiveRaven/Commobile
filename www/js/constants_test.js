describe("aa.commobile.constants", function() {
    beforeEach(function() {
        module("aa.commobile.constants");
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
});