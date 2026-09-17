"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'UsptoApiCatalog',
        slug: "uspto-api-catalog",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://developer.uspto.gov",
        auth: {
            prefix: '',
            name: 'X-API-KEY',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            patent: {},
            trademark: {},
        }
    };
    entity = {
        "patent": {
            "fields": [
                {
                    "name": "applicationNumber",
                    "type": "`$STRING`"
                },
                {
                    "name": "assignee",
                    "type": "`$STRING`"
                },
                {
                    "format": "date",
                    "name": "assignmentDate",
                    "type": "`$STRING`"
                },
                {
                    "name": "assignmentId",
                    "type": "`$STRING`"
                },
                {
                    "name": "assignor",
                    "type": "`$STRING`"
                },
                {
                    "name": "citationNumber",
                    "type": "`$STRING`"
                },
                {
                    "name": "citationType",
                    "type": "`$STRING`"
                },
                {
                    "name": "citations",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "data",
                    "type": "`$ARRAY`"
                },
                {
                    "format": "date",
                    "name": "date",
                    "type": "`$STRING`"
                },
                {
                    "name": "patentNumber",
                    "type": "`$STRING`"
                },
                {
                    "name": "rejectionText",
                    "type": "`$STRING`"
                },
                {
                    "name": "rejectionType",
                    "type": "`$STRING`"
                },
                {
                    "name": "text",
                    "type": "`$STRING`"
                },
                {
                    "format": "uri",
                    "name": "url",
                    "type": "`$STRING`"
                }
            ],
            "name": "patent",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "xml",
                                        "kind": "query",
                                        "name": "format",
                                        "orig": "format",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "search_query",
                                        "orig": "search_query",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/patent-assignment/v1.4",
                            "segments": [
                                {
                                    "lit": "patent-assignment"
                                },
                                {
                                    "lit": "v1.4"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "format",
                                    "search_query"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.assignments`"
                            },
                            "parts": [
                                "patent-assignment",
                                "v1.4"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "application_number",
                                        "orig": "application_number",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/office-action-citations/v2",
                            "segments": [
                                {
                                    "lit": "office-action-citations"
                                },
                                {
                                    "lit": "v2"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "application_number"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.citations`"
                            },
                            "parts": [
                                "office-action-citations",
                                "v2"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "application_number",
                                        "orig": "application_number",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/office-action-rejections/v2",
                            "segments": [
                                {
                                    "lit": "office-action-rejections"
                                },
                                {
                                    "lit": "v2"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "application_number"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.rejections`"
                            },
                            "parts": [
                                "office-action-rejections",
                                "v2"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "date",
                                        "orig": "date",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/office-action-weekly-zips/v1",
                            "segments": [
                                {
                                    "lit": "office-action-weekly-zips"
                                },
                                {
                                    "lit": "v1"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "date"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.files`"
                            },
                            "parts": [
                                "office-action-weekly-zips",
                                "v1"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "patent_number",
                                        "orig": "patent_number",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/enriched-citation/v3",
                            "segments": [
                                {
                                    "lit": "enriched-citation"
                                },
                                {
                                    "lit": "v3"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "patent_number"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.citations`"
                            },
                            "parts": [
                                "enriched-citation",
                                "v3"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "query",
                                        "orig": "query",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/ptab/v3",
                            "segments": [
                                {
                                    "lit": "ptab"
                                },
                                {
                                    "lit": "v3"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "query"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "parts": [
                                "ptab",
                                "v3"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "application_number",
                                        "orig": "application_number",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/office-action-text/v1",
                            "segments": [
                                {
                                    "lit": "office-action-text"
                                },
                                {
                                    "lit": "v1"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "application_number"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.officeAction`"
                            },
                            "parts": [
                                "office-action-text",
                                "v1"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "trademark": {
            "fields": [
                {
                    "name": "assignments",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "documents",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "serialNumber",
                    "type": "`$STRING`"
                },
                {
                    "name": "status",
                    "type": "`$STRING`"
                }
            ],
            "name": "trademark",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "xml",
                                        "kind": "query",
                                        "name": "format",
                                        "orig": "format",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "search_query",
                                        "orig": "search_query",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/trademark-assignment/v1.4",
                            "segments": [
                                {
                                    "lit": "trademark-assignment"
                                },
                                {
                                    "lit": "v1.4"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "format",
                                    "search_query"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.assignments`"
                            },
                            "parts": [
                                "trademark-assignment",
                                "v1.4"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "registration_number",
                                        "orig": "registration_number",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "serial_number",
                                        "orig": "serial_number",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/tsdr/v1.0",
                            "segments": [
                                {
                                    "lit": "tsdr"
                                },
                                {
                                    "lit": "v1.0"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "registration_number",
                                    "serial_number"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.trademarkStatus`"
                            },
                            "parts": [
                                "tsdr",
                                "v1.0"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map