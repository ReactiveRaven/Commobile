module.exports = [
    {
        request: {
            path: "/_session",
            method: "POST"
        },
        response: {
            data: {
                "ok": true,
                "userCtx": {
                    "name": "username",
                    "roles": ["role1","role2"]
                },
                "info": {
                    "authentication_db":"_users",
                    "authentication_handlers":["oauth","cookie","default"],
                    "authenticated":"default"
                }
            }
        }
    }
]; // for multiple mocks.