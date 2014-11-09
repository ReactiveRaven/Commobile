describe("aa.commobile.service.url", function() {
    var UrlService,
        UserService;
    
    beforeEach(function() {
        module("aa.commobile.service.url");
        inject(function(_UrlService_, _UserService_) {
            UrlService = _UrlService_;
            UserService = _UserService_;
        });
    });
    
    it("should be an object", function() {
        expect(typeof UrlService).toBe("object");
    });
    
    describe("render", function() {
        it("should be a function", function() {
            expect(typeof UrlService.render).toBe("function");
        });
        
        it("should return a promise", function() {
            var result = UrlService.render("");
            expect(typeof result).toBe("object");
            expect(typeof result.then).toBe("function");
        });
        
        it("should pull values from other services to replace placeholders", function() {
            var replaceable = "/user/{{ UserService.getUserName }}",
                expected = "/user/johnsmith",
                flag;
            
            UserService.getUserName = jasmine.createSpy("getUserName");
            UserService.getUserName.andReturn(resolved("johnsmith"));
            
            UrlService.render(replaceable).then(function(result) {
                flag = result;
            });
            
            digest();
            
            expect(flag).toBe(expected);
        });
    })
});
