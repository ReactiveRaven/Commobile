angular.module(
        "aa.commobile.service.url",
        [
            "aa.commobile.service.user"
        ]
    )
    .factory(
        "UrlService",
        function(
            UserService,
            $q
        ) {
            var knownServices = {
                    UserService: UserService
                },
                UrlService;

            UrlService = {
                render: function(template) {
                    var deferred = $q.defer(),
                        tokens = template.match(/\{\{ [^}]+ \}\}/g);

                    promises = (Array.isArray(tokens) ? tokens : [])
                        .filter(function(value, index, arr) {
                            return arr.indexOf(value) === index;
                        })
                        .map(function(val) {
                            return val.replace(/(^\{\{ | \}\}$)/g, "").split(".");
                        }).filter(function(val) {
                            var ok = (
                                    typeof knownServices[val[0]] !== "undefined" &&
                                    typeof knownServices[val[0]][val[1]] === "function"
                                );
                            if (!ok) {
                                throw "Do not know how to handle token '" + val.join(".") + "'";
                            }
                            return ok;
                        }).map(function(val) {
                            return $q.when(
                                knownServices[val[0]][val[1]]()
                            ).then(function(retval) {
                                return {
                                    token: "{{ " + val.join(".") + " }}",
                                    result: retval
                                };
                            });
                        });

                    $q.all(promises).then(function(results) {
                        results.forEach(function(result) {
                            template = template.split(result.token).join(result.result);
                        });
                        deferred.resolve(template);
                    });

                    return deferred.promise;
                }
            };

            return UrlService;
        }
    );
