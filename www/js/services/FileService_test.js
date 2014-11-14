describe("FileService", function() {
    var FileService,
        UrlService,
        $httpBackend,
        API_HOST,
        URL_FILE,
        fakeLsResponse;

    beforeEach(function() {
        module("aa.commobile.service.file");
        inject(
            function(
                _FileService_, _$httpBackend_, _UrlService_,
                _API_HOST_, _URL_FILE_
            ) {
                FileService = _FileService_;
                $httpBackend = _$httpBackend_;
                UrlService = _UrlService_;
                API_HOST = _API_HOST_;
                URL_FILE = _URL_FILE_;
            }
        );
        spyOn(UrlService, "render").and.returnValue(resolved("RENDERED_URL"));
        $httpBackend.when("GET", "RENDERED_URL").respond(resolved(fakeLsResponse));
        fakeLsResponse = {
            "total_rows": 3,
            "offset": 0,
            "rows": [
                {
                    "key": "2009/01/15 15:52:20",
                    "id": "hello-world",
                    "value": "Hello World"
                },
                {
                    "key": "2009/01/30 18:04:11",
                    "id": "biking",
                    "value": "Biking"
                },
                {
                    "key": "2009/02/17 21:13:39",
                    "id": "bought-a-cat",
                    "value": "Bought a Cat"
                }
            ]
        };
    });

    describe("ls", function() {

        it("should be a function", function() {
            expect(typeof FileService.ls).toBe("function");
        });

        it("should return a promise", function() {
            var response = FileService.ls();

            expect(typeof response).toBe("object");
            expect(typeof response.then).toBe("function");
        });

        it("should render the url with UrlService", function() {
            FileService.ls();
            expect(UrlService.render).toHaveBeenCalled();
        });
        
        it("should default to '/' if no folder given", function() {
            var dirname = "/",
                encodedDirname = encodeURIComponent(dirname),
                renderedUrl = "RENDERED_URL",
                fullUrl = "RENDERED_URL?firstKey=" + encodedDirname + "&lastKey=" + encodedDirname;

            $httpBackend.expect(
                "GET",
                fullUrl
            ).respond(resolved(fakeLsResponse));
            FileService.ls();
            flush();            
        });

        it("should accept a folder name to send to the server", function() {
            var dirname = "/fish/and/chips",
                encodedDirname = encodeURIComponent(dirname),
                renderedUrl = "RENDERED_URL",
                fullUrl = "RENDERED_URL?firstKey=" + encodedDirname + "&lastKey=" + encodedDirname;

            $httpBackend.expect(
                "GET",
                fullUrl
            ).respond(resolved(fakeLsResponse));
            FileService.ls(dirname);
            flush();
        });
        
        it("should reject on server error", function() {
            var flag = null;

            $httpBackend.expectGET("RENDERED_URL?firstKey=%2F&lastKey=%2F").respond(404);
            FileService.ls().then(function() {
                flag = "resolved";
            }, function() {
                flag = "rejected";
            });
            flush();
            expect(flag).toBe("rejected");
        });
    });

    describe("getInfo", function() {
        var testFileId = "test-file-id",
            fakeLsResponse;

        beforeEach(function() {
            fakeGetInfoResponse = {
                "_id": "biking",
                "_rev": "AE19EBC7654",

                "title": "Biking",
                "body": "My biggest hobby is mountainbiking. The other day...",
                "date": "2009/01/30 18:04:11"
            };
            $httpBackend.whenGET("RENDERED_URL/" + testFileId)
                .respond(resolved(fakeGetInfoResponse));
        });

        it("should be a function", function() {
            expect(typeof FileService.getInfo).toBe("function");
        });

        it("should require a file id", function() {
            var didThrow = false;
            try {
                FileService.getInfo();
            } catch (e) {
                didThrow = e;
            }

            expect(didThrow).not.toBe(false);
        });

        it("should return a promise", function() {
            var response = FileService.getInfo(testFileId);
            expect(typeof response).toBe("object");
            expect(typeof response.then).toBe("function");
        });

        it("should render the url with UrlService", function() {
            FileService.getInfo(testFileId);
            digest();
            flush();
            expect(UrlService.render).toHaveBeenCalled();
        });

        it("should query the server for information", function() {
            $httpBackend.expect("GET", "RENDERED_URL/" + testFileId)
                .respond(resolved(fakeGetInfoResponse));
            FileService.getInfo(testFileId);
            $httpBackend.flush();
        });

        it("should resolve with the document information", function() {
            var flag = null;
            FileService.getInfo(testFileId).then(function(result) {
                flag = result;
            });
            flush();
            expect(flag).toBe(fakeGetInfoResponse);
        });
        
        it("should reject on server error", function() {
            $httpBackend.expect("GET", "RENDERED_URL/" + testFileId).respond(404);
            var flag = null;
            FileService.getInfo(testFileId).then(function() {
                flag = "resolved";
            }, function() {
                flag = "rejected";
            });
            
            flush();
            
            expect(flag).toBe("rejected");
        });
    });
});
