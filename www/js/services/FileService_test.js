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

        beforeEach(function() {
            $httpBackend.when("GET", API_HOST + URL_FILE).respond();
        });

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

        it("should pull from the server", function() {
            $httpBackend.expectGET("RENDERED_URL");

            FileService.ls();
            $httpBackend.flush();
        });

        it("should accept a folder name to send to the server", function() {
            var dirname = "/fish/and/chips",
                encodedDirname = encodeURIComponent(dirname),
                renderedUrl = "RENDERED_URL";
            $httpBackend.expect(
                "GET",
                "RENDERED_URL?firstKey=" + encodedDirname + "&lastKey=" + encodedDirname
            );
            FileService.ls(dirname);
            $httpBackend.flush();
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
            expect(UrlService.render).toHaveBeenCalled();
        });

        it("should query the server for information", function() {
            $httpBackend.expect("GET", "RENDERED_URL/" + testFileId);
            FileService.getInfo(testFileId);
            $httpBackend.flush();
        });

        it("should resolve with the document information", function() {

        });
    });
});
