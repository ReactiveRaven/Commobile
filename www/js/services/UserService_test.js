describe("UserService", function() {

    var UserService,
        API_HOST,
        URL_SESSION,
        $httpBackend,
        fakeDeets = {
            username: "john",
            password: "swordfish"
        },
        fakeContext = {
            ok: true,
            userCtx: {
                name: "john",
                roles: []
            }
        },
        token = "DEADBEEFCA7";

    beforeEach(function() {
        module("aa.commobile.service.user");
        inject(function(_UserService_, _API_HOST_, _URL_SESSION_, _$httpBackend_) {
            UserService = _UserService_;
            API_HOST = _API_HOST_;
            URL_SESSION = _URL_SESSION_;
            $httpBackend = _$httpBackend_;
            $httpBackend.when("get", URL_SESSION)
                .respond({ ok: true }, { "Set-Cookie": "AuthSession=" + token });
            $httpBackend.when("POST", URL_SESSION)
                .respond({ ok: true }, { "Set-Cookie": "AuthSession=" + token });
            $httpBackend.when("DELETE", API_HOST + URL_SESSION)
                .respond({ ok: true });
        });
    });

    it("should be an object", function() {
        expect(typeof UserService).toBe("object");
    });

    it("should always return itsself on 'set' functions", function() {
        var excluded = [];
        Object.keys(UserService).filter(function(key) {
            return excluded.indexOf(key) === -1 && key.indexOf("set") === 0;
        }).forEach(function(key) {
            expect(UserService[key]())
                .toBe(
                    UserService,
                    key + " should return UserService"
                );
        });
    });

    describe("policies:", function() {
        it("no 'token' functions", function() {
            expect(Object.keys(UserService).filter(function(key) {
                return (key + "").toLowerCase().indexOf("token") > -1;
            }).length).toBe(0);
        });
    });

    describe("login()", function() {

        beforeEach(function() {
            $httpBackend.when("POST", API_HOST + URL_SESSION).respond(window.mocks.login.success);
        });

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it("should be a function", function() {
            expect(typeof UserService.login).toBe("function");
        });

        it("should call the login endpoint", function() {
            $httpBackend.expectPOST(API_HOST + URL_SESSION);
            UserService.login();
            $httpBackend.flush();
        });

        it("should post the username and password to the server", function() {
            $httpBackend.expectPOST(API_HOST + URL_SESSION, fakeDeets);
            UserService.login(fakeDeets.username, fakeDeets.password);
            $httpBackend.flush();
        });

        describe("Successful", function() {
            it("should return a promise", function() {
                var result = UserService.login();
                expect(typeof result).toBe("object");
                expect(typeof result.then).toBe("function");
                $httpBackend.flush();
            });

            it("should resolve the promise on successful response", function() {
                var result = UserService.login(),
                    flag = false;
                UserService.login().then(function() {
                    flag = true;
                });
                expect(flag).toBe(false);
                $httpBackend.flush();
                expect(flag).toBe(true, "should resolve promise on server response");
            });
        });

        describe("Unsuccessful", function() {
            var failResponse;

            it("should reject on unsuccessful response", function() {
                $httpBackend.expectPOST(API_HOST + URL_SESSION).respond(window.mocks.login.fail);
                var flag = null;

                UserService.login().then(function() {
                    flag = "resolved";
                }, function() {
                    flag = "rejected";
                });

                $httpBackend.flush();

                expect(flag).toBe("rejected");
            });

            it("should reject promise on server error", function() {
                $httpBackend.expectPOST(API_HOST + URL_SESSION).respond(401);
                var flag = null;
                UserService.login().then(function() {
                    flag = "resolved";
                }, function() {
                    flag = "rejected";
                });

                $httpBackend.flush();

                expect(flag).toBe("rejected");
            });
        });

    });

    describe("logout()", function() {

        it("should be a function", function() {
            expect(typeof UserService.logout).toBe("function");
        });

        it("should return a promise", function() {
            var response = UserService.logout();
            expect(typeof response).toBe("object");
            expect(typeof response.then).toBe("function");
        });

        it("should hit the logout endpoint to invalidate the token", function() {
            $httpBackend.expectDELETE(API_HOST + URL_SESSION);
            UserService.logout();
            $httpBackend.flush();
        });

        it("should resolve the promise on server response", function() {
            var flag;
            UserService.logout().then(
                function() { flag = "resolved"; },
                function() { flag = "rejected"; }
            );
            expect(flag).toBeUndefined();
            $httpBackend.flush();
            expect(flag).toBe("resolved");
        });

        it("should reject the promise on server error", function() {
            var flag;
            $httpBackend.expectDELETE(API_HOST + URL_SESSION).respond(401);
            UserService.logout().then(
                function() { flag = "resolved"; },
                function() { flag = "rejected"; }
            );
            expect(flag).toBeUndefined();
            $httpBackend.flush();
            expect(flag).toBe("rejected");
        });
    });

    describe("getContext", function() {

        beforeEach(function() {
            $httpBackend.when("GET", API_HOST + URL_SESSION).respond(fakeContext);
        });

        it("should be a function", function() {
            expect(typeof UserService.getContext).toBe("function");
        });

        it("should return a promise", function() {
            var result = UserService.getContext();
            expect(typeof result).toBe("object");
            expect(typeof result.then).toBe("function");
        });

        it("should call to session endpoint", function() {
            $httpBackend.expectGET(API_HOST + URL_SESSION);
            UserService.getContext();
            $httpBackend.flush();
        });

        it("should resolve with the user context on server response", function() {
            var flag;
            UserService.getContext().then(function(result) {
                flag = result;
            });
            expect(flag).toBeUndefined();
            $httpBackend.flush();
            expect(flag).toEqual(fakeContext.userCtx);
        });
    });

    describe("getUsername", function() {
        beforeEach(function() {
            var x = resolved(fakeContext);
            spyOn(UserService, "getContext").and.returnValue(x);
        });

        it("should be a function", function() {
            expect(typeof UserService.getUsername).toBe("function");
        });

        it("should call through to getContext", function() {
            UserService.getUsername();
            expect(UserService.getContext).toHaveBeenCalled();
        });

        it("should return the username from the context object", function() {
            var flag = null;
            UserService.getUsername().then(function(result) {
                flag = result;
            });
            expect(flag).toBe(null);
            digest();
            expect(flag).toBe(fakeContext.userCtx.name);
        });
    });
});
