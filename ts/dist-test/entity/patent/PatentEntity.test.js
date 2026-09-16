"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('PatentEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when USPTO_API_CATALOG_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('USPTO_API_CATALOG_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.UsptoApiCatalogSDK.test();
        const ent = testsdk.Patent();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.USPTO_API_CATALOG_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'patent.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "applicationNumber", "req": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "assignee", "req": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "format": "date", "name": "assignmentDate", "req": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "assignmentId", "req": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "assignor", "req": false, "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "citationNumber", "req": false, "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "citationType", "req": false, "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "citations", "req": false, "type": "`$ARRAY`", "index$": 7 }, { "active": true, "name": "data", "req": false, "type": "`$ARRAY`", "index$": 8 }, { "active": true, "format": "date", "name": "date", "req": false, "type": "`$STRING`", "index$": 9 }, { "active": true, "name": "patentNumber", "req": false, "type": "`$STRING`", "index$": 10 }, { "active": true, "name": "rejectionText", "req": false, "type": "`$STRING`", "index$": 11 }, { "active": true, "name": "rejectionType", "req": false, "type": "`$STRING`", "index$": 12 }, { "active": true, "name": "text", "req": false, "type": "`$STRING`", "index$": 13 }, { "active": true, "format": "uri", "name": "url", "req": false, "type": "`$STRING`", "index$": 14 }], "name": "patent", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "xml", "kind": "query", "name": "format", "orig": "format", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "search_query", "orig": "search_query", "reqd": false, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "GET /patent-assignment/v1.4", "json": "{\"operationId\":\"getPatentAssignments\",\"parameters\":[{\"description\":\"Search query for patent assignments\",\"in\":\"query\",\"name\":\"searchQuery\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Response format (xml or json)\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"xml\",\"enum\":[\"xml\",\"json\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"assignments\":{\"items\":{\"properties\":{\"assignee\":{\"type\":\"string\"},\"assignmentDate\":{\"format\":\"date\",\"type\":\"string\"},\"assignmentId\":{\"type\":\"string\"},\"assignor\":{\"type\":\"string\"},\"patentNumber\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}},\"application/xml\":{\"schema\":{\"type\":\"object\"}}},\"description\":\"Successful response with patent assignment data\"},\"400\":{\"description\":\"Bad request\"},\"401\":{\"description\":\"Unauthorized - API key required\"},\"500\":{\"description\":\"Internal server error\"}},\"security\":[{\"apiKeyAuth\":[]}],\"securitySchemes\":{\"apiKeyAuth\":{\"description\":\"API key required for accessing USPTO APIs. Request an API key from the USPTO Open Data Portal.\",\"in\":\"header\",\"name\":\"X-API-KEY\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/patent-assignment/v1.4", "segments": [{ "lit": "patent-assignment" }, { "lit": "v1.4" }], "select": { "exist": ["format", "search_query"] }, "transform": { "req": "`reqdata`", "res": "`body.assignments`" }, "index$": 0 }, { "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "application_number", "orig": "application_number", "reqd": false, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /office-action-citations/v2", "json": "{\"operationId\":\"getOfficeActionCitations\",\"parameters\":[{\"description\":\"Patent application number\",\"in\":\"query\",\"name\":\"applicationNumber\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"citations\":{\"items\":{\"properties\":{\"citationNumber\":{\"type\":\"string\"},\"citationType\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with office action citations\"},\"400\":{\"description\":\"Bad request\"},\"401\":{\"description\":\"Unauthorized - API key required\"},\"404\":{\"description\":\"Citations not found\"},\"500\":{\"description\":\"Internal server error\"}},\"security\":[{\"apiKeyAuth\":[]}],\"securitySchemes\":{\"apiKeyAuth\":{\"description\":\"API key required for accessing USPTO APIs. Request an API key from the USPTO Open Data Portal.\",\"in\":\"header\",\"name\":\"X-API-KEY\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/office-action-citations/v2", "segments": [{ "lit": "office-action-citations" }, { "lit": "v2" }], "select": { "exist": ["application_number"] }, "transform": { "req": "`reqdata`", "res": "`body.citations`" }, "index$": 1 }, { "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "application_number", "orig": "application_number", "reqd": false, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /office-action-rejections/v2", "json": "{\"operationId\":\"getOfficeActionRejections\",\"parameters\":[{\"description\":\"Patent application number\",\"in\":\"query\",\"name\":\"applicationNumber\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"rejections\":{\"items\":{\"properties\":{\"rejectionText\":{\"type\":\"string\"},\"rejectionType\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with office action rejections\"},\"400\":{\"description\":\"Bad request\"},\"401\":{\"description\":\"Unauthorized - API key required\"},\"404\":{\"description\":\"Rejections not found\"},\"500\":{\"description\":\"Internal server error\"}},\"security\":[{\"apiKeyAuth\":[]}],\"securitySchemes\":{\"apiKeyAuth\":{\"description\":\"API key required for accessing USPTO APIs. Request an API key from the USPTO Open Data Portal.\",\"in\":\"header\",\"name\":\"X-API-KEY\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/office-action-rejections/v2", "segments": [{ "lit": "office-action-rejections" }, { "lit": "v2" }], "select": { "exist": ["application_number"] }, "transform": { "req": "`reqdata`", "res": "`body.rejections`" }, "index$": 2 }, { "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "date", "orig": "date", "reqd": false, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /office-action-weekly-zips/v1", "json": "{\"operationId\":\"getOfficeActionWeeklyZips\",\"parameters\":[{\"description\":\"Date for the weekly zip file (YYYY-MM-DD format)\",\"in\":\"query\",\"name\":\"date\",\"required\":false,\"schema\":{\"format\":\"date\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"files\":{\"items\":{\"properties\":{\"date\":{\"format\":\"date\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with office action weekly zip data\"},\"400\":{\"description\":\"Bad request\"},\"401\":{\"description\":\"Unauthorized - API key required\"},\"500\":{\"description\":\"Internal server error\"}},\"security\":[{\"apiKeyAuth\":[]}],\"securitySchemes\":{\"apiKeyAuth\":{\"description\":\"API key required for accessing USPTO APIs. Request an API key from the USPTO Open Data Portal.\",\"in\":\"header\",\"name\":\"X-API-KEY\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/office-action-weekly-zips/v1", "segments": [{ "lit": "office-action-weekly-zips" }, { "lit": "v1" }], "select": { "exist": ["date"] }, "transform": { "req": "`reqdata`", "res": "`body.files`" }, "index$": 3 }, { "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "patent_number", "orig": "patent_number", "reqd": false, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /enriched-citation/v3", "json": "{\"operationId\":\"getEnrichedCitations\",\"parameters\":[{\"description\":\"Patent number to retrieve citation data for\",\"in\":\"query\",\"name\":\"patentNumber\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"citations\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with enriched citation data\"},\"400\":{\"description\":\"Bad request\"},\"401\":{\"description\":\"Unauthorized - API key required\"},\"404\":{\"description\":\"Patent not found\"},\"500\":{\"description\":\"Internal server error\"}},\"security\":[{\"apiKeyAuth\":[]}],\"securitySchemes\":{\"apiKeyAuth\":{\"description\":\"API key required for accessing USPTO APIs. Request an API key from the USPTO Open Data Portal.\",\"in\":\"header\",\"name\":\"X-API-KEY\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/enriched-citation/v3", "segments": [{ "lit": "enriched-citation" }, { "lit": "v3" }], "select": { "exist": ["patent_number"] }, "transform": { "req": "`reqdata`", "res": "`body.citations`" }, "index$": 4 }, { "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "query", "orig": "query", "reqd": false, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /ptab/v3", "json": "{\"operationId\":\"getPTABData\",\"parameters\":[{\"description\":\"Search query for PTAB data\",\"in\":\"query\",\"name\":\"query\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with PTAB data\"},\"400\":{\"description\":\"Bad request\"},\"401\":{\"description\":\"Unauthorized - API key required\"},\"500\":{\"description\":\"Internal server error\"}},\"security\":[{\"apiKeyAuth\":[]}],\"securitySchemes\":{\"apiKeyAuth\":{\"description\":\"API key required for accessing USPTO APIs. Request an API key from the USPTO Open Data Portal.\",\"in\":\"header\",\"name\":\"X-API-KEY\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/ptab/v3", "segments": [{ "lit": "ptab" }, { "lit": "v3" }], "select": { "exist": ["query"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 5 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "application_number", "orig": "application_number", "reqd": false, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /office-action-text/v1", "json": "{\"operationId\":\"getOfficeActionText\",\"parameters\":[{\"description\":\"Patent application number\",\"in\":\"query\",\"name\":\"applicationNumber\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"officeAction\":{\"properties\":{\"applicationNumber\":{\"type\":\"string\"},\"text\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response with office action text\"},\"400\":{\"description\":\"Bad request\"},\"401\":{\"description\":\"Unauthorized - API key required\"},\"404\":{\"description\":\"Office action not found\"},\"500\":{\"description\":\"Internal server error\"}},\"security\":[{\"apiKeyAuth\":[]}],\"securitySchemes\":{\"apiKeyAuth\":{\"description\":\"API key required for accessing USPTO APIs. Request an API key from the USPTO Open Data Portal.\",\"in\":\"header\",\"name\":\"X-API-KEY\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/office-action-text/v1", "segments": [{ "lit": "office-action-text" }, { "lit": "v1" }], "select": { "exist": ["application_number"] }, "transform": { "req": "`reqdata`", "res": "`body.officeAction`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "patent", "name__orig": "patent", "Name": "Patent", "name_": "patent", "name-": "patent", "NAME": "PATENT", "index$": 0 }, { "active": true, "entity": "patent", "key$": "BasicPatentFlow", "kind": "basic", "name": "BasicPatentFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "patent_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "patent_ref01", "srcdatavar": "patent_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-patent_ref01" } }], "index$": 1 }] }, 'Patent');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let patent_ref01_data = Object.values(setup.data.existing.patent)[0];
        // LIST
        const patent_ref01_ent = client.Patent();
        const patent_ref01_match = {};
        const patent_ref01_list = (await patent_ref01_ent.list(patent_ref01_match)).map((e) => e.data());
        // LOAD
        const patent_ref01_match_dt0 = {};
        const patent_ref01_data_dt0 = (await patent_ref01_ent.load(patent_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != patent_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/patent/PatentTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.UsptoApiCatalogSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['patent01', 'patent02', 'patent03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'USPTO_API_CATALOG_TEST_PATENT_ENTID': idmap,
        'USPTO_API_CATALOG_TEST_LIVE': 'FALSE',
        'USPTO_API_CATALOG_TEST_EXPLAIN': 'FALSE',
        'USPTO_API_CATALOG_APIKEY': '',
    });
    idmap = env['USPTO_API_CATALOG_TEST_PATENT_ENTID'];
    const live = 'TRUE' === env.USPTO_API_CATALOG_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['USPTO_API_CATALOG_TEST_PATENT_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.UsptoApiCatalogSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.USPTO_API_CATALOG_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.USPTO_API_CATALOG_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=PatentEntity.test.js.map