module.exports = {
    "error":"Name or password is incorrect."
};

if (typeof window !== "undefined") {
    window.mocks = window.mocks || {};
    window.mocks.login = window.mocks.login || {};
    window.mocks.login.fail = module.exports;
}
