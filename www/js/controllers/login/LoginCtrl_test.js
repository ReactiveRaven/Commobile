describe("aa.commobile.controller.login", function() {
    var scope,
        UserService;

    beforeEach(function() {
        module("aa.commobile.controller.login");
        inject(function($controller, $rootScope, _UserService_) {
            scope = $rootScope.$new();
            UserService = _UserService_;
            spyOn(UserService, "login");
            $controller("LoginCtrl", {
                $scope: scope,
                UserService: UserService
            });
        });
    });

    describe("LoginCtrl", function() {
        it("should name its scope", function() {
            expect(scope.name).toBe("LoginCtrl");
        });

        describe("login()", function() {
            it("should be a function", function() {
                expect(typeof scope.login).toBe("function");
            });
            it("should trigger logging in with UserService", function() {

            });
        });
    });
});
