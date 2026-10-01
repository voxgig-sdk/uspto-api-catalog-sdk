"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "patent",
        "accessor": "Patent",
        "op": "list",
        "method": "GET",
        "path": "/patent-assignment/v1.4",
        "args": [],
        "select": {
            "format": "v1",
            "search_query": "v1"
        },
        "headers": [],
        "query": [
            "searchQuery",
            "format"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "assignments": [
                {
                    "assignee": "x",
                    "assignmentDate": "2026-01-01",
                    "assignmentId": "x",
                    "assignor": "x",
                    "patentNumber": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "patent",
        "accessor": "Patent",
        "op": "list",
        "method": "GET",
        "path": "/office-action-weekly-zips/v1",
        "args": [],
        "select": {
            "date": "v1"
        },
        "headers": [],
        "query": [
            "date"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "files": [
                {
                    "date": "2026-01-01",
                    "url": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "patent",
        "accessor": "Patent",
        "op": "list",
        "method": "GET",
        "path": "/enriched-citation/v3",
        "args": [],
        "select": {
            "patent_number": "v1"
        },
        "headers": [],
        "query": [
            "patentNumber"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "citations": [
                {}
            ]
        },
        "idField": "id"
    },
    {
        "entity": "patent",
        "accessor": "Patent",
        "op": "list",
        "method": "GET",
        "path": "/ptab/v3",
        "args": [],
        "select": {
            "query": "v1"
        },
        "headers": [],
        "query": [
            "query"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {}
            ]
        },
        "idField": "id"
    },
    {
        "entity": "patent",
        "accessor": "Patent",
        "op": "load",
        "method": "GET",
        "path": "/office-action-text/v1",
        "args": [],
        "select": {
            "application_number": "v1"
        },
        "headers": [],
        "query": [
            "applicationNumber"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "officeAction": {
                "applicationNumber": "x",
                "text": "x"
            }
        },
        "idField": "id"
    },
    {
        "entity": "trademark",
        "accessor": "Trademark",
        "op": "list",
        "method": "GET",
        "path": "/trademark-assignment/v1.4",
        "args": [],
        "select": {
            "format": "v1",
            "search_query": "v1"
        },
        "headers": [],
        "query": [
            "searchQuery",
            "format"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "assignments": [
                {}
            ]
        },
        "idField": "id"
    },
    {
        "entity": "trademark",
        "accessor": "Trademark",
        "op": "load",
        "method": "GET",
        "path": "/tsdr/v1.0",
        "args": [],
        "select": {
            "registration_number": "v1",
            "serial_number": "v1"
        },
        "headers": [],
        "query": [
            "serialNumber",
            "registrationNumber"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "trademarkStatus": {
                "documents": [
                    {}
                ],
                "serialNumber": "x",
                "status": "x"
            }
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map