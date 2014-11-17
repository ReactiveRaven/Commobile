describe("aa.commobile.controller.login", function() {
    var scope,
        UserService,
        $state;

    beforeEach(function() {
        module("aa.commobile.controller.login");
        inject(function($controller, $rootScope, _UserService_) {
            scope = $rootScope.$new();
            UserService = _UserService_;
            spyOn(UserService, "login");
            UserService.login.and.returnValue(resolved(true));
            $state = jasmine.createSpyObj("$state", [ "go" ]);
            $controller("LoginCtrl", {
                $scope: scope,
                UserService: UserService,
                $state: $state
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
                scope.login();
                expect(UserService.login).toHaveBeenCalled();
            });
            it("should pass in the current username and password from scope", function() {
                scope.username = "testuser";
                scope.password = "testpass";
                scope.login();
                expect(UserService.login).toHaveBeenCalledWith(scope.username, scope.password);
            });
            it("should set loginFailed to true when unsuccessful", function() {
                scope.loginFailed = undefined;
                UserService.login.and.returnValue(rejected());
                scope.login();
                expect(scope.loginFailed).toBeUndefined();
                digest();
                expect(scope.loginFailed).toBe(true);
            });
            it("should set loginFailed to false when successful", function() {
                scope.loginFailed = undefined;
                UserService.login.and.returnValue(resolved());
                scope.login();
                expect(scope.loginFailed).toBeUndefined();
                digest();
                expect(scope.loginFailed).toBe(false);
            });
            it("should forward to homepage when successful", function() {
                UserService.login.and.returnValue(resolved(true));
                scope.login();
                digest();
                expect($state.go).toHaveBeenCalled();
            });
        });
    });
});
