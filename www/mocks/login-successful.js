module.exports = {
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
};

if (typeof window !== "undefined") {
    window.mocks = window.mocks || {};
    window.mocks.login = window.mocks.login || {};
    window.mocks.login.success = module.exports;
}
