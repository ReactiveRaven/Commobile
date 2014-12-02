module.exports = {
    "total_rows":3,
    "offset":0,
    "rows":[
        {
            "id":"11111",
            "key":[
                "bobross"
            ],
            "value":null,
            "doc":{
                "_id":"11111",
                "_rev":"1-0eee81fecb5aa4f51e285c621271ff02",
                "name":"bobross"
            }
        },
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
        {
            "id":"33333",
            "key":[
                "davinci"
            ],
            "value":null,
            "doc":{
                "_id":"33333",
                "_rev":"1-0eee81fecb5aa4f51e285c621271ff02",
                "name":"davinci"
            }
        },
    ]
};


if (typeof window !== "undefined") {
    window.mocks = window.mocks || {};
    window.mocks.artists = window.mocks.artists || {};
    window.mocks.artists.three = module.exports;
}
