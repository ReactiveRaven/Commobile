module.exports = {
    "total_rows":0,
    "offset":0,
    "rows":[
    ]
};


if (typeof window !== "undefined") {
    window.mocks = window.mocks || {};
    window.mocks.artists = window.mocks.artists || {};
    window.mocks.artists.search = window.mocks.artists.search || {};
    window.mocks.artists.search["not-found"] = module.exports;
}
