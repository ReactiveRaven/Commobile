module.exports = {
    request: {
        path: "/_session",
        method: "POST"
    },
    response: {
        data: require("../../www/mocks/login-fail")
    }
};