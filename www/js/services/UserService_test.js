describe("UserService", function() {
    
    var UserService;
    
    beforeEach(function() {
        module("commobile.service.user");
        inject(function(_UserService_) {
            UserService = _UserService_;
        });
    });
    
    it("should be an object", function() {
        expect(typeof UserService).toBe("object");
    });
    
    describe("setToken", function() {
        it("should be a function", function() {
            expect(typeof UserService.setToken).toBe("function");
        });
        
        it("should set the token", function() {
            var token = "pizza pie";
            UserService.setToken(token);
            expect(UserService.getToken()).toBe(token);
        });
        
        it("should return UserService", function() {
            expect(UserService.setToken(null)).toBe(UserService);
        })
    });
    
    describe("getToken", function() {
        it("should be a function", function() {
            expect(typeof UserService.getToken).toBe("function");
        });
        
        it("should return the token", function() {
            var token = "TESTING";
            UserService.setToken(token);
            expect(UserService.getToken()).toBe(token);
        });
    });
    
    describe("login", function() {
        
        var $httpBackend;
        
        beforeEach(inject(function(_$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.when("POST", "/login")
                .respond({userid: 42, token: "DEADBEEFCA7"});
        }));
        
        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
        
        it("should be a function", function() {
            expect(typeof UserService.login).toBe("function");
        });
        
        it("should call the login endpoint", function() {
            $httpBackend.expectPOST("/login");
            UserService.login();
            $httpBackend.flush();
        });
    });
});