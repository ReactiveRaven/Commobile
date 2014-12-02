module.exports = {
    "total_rows":1,
    "offset":0,
    "rows":[
        {
            "id":"22222",
            "key":[
                "picasso"
            ],
            "value":null,
            "doc":{
                "_id":"22222",
                "_rev":"1-0eee81fecb5aa4f51e285c621271ff02",
                "name":"picasso"
            }
        },
    ]
};


if (typeof window !== "undefined") {
    window.mocks = window.mocks || {};
    window.mocks.artists = window.mocks.artists || {};
    window.mocks.artists.search = window.mocks.artists.search || {};
    window.mocks.artists.search.picasso = module.exports;
}
