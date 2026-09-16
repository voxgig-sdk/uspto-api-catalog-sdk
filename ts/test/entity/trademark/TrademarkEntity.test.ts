

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { UsptoApiCatalogSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('TrademarkEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when USPTO_API_CATALOG_TEST_LIVE=TRUE.
  afterEach(liveDelay('USPTO_API_CATALOG_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = UsptoApiCatalogSDK.test()
    const ent = testsdk.Trademark()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.USPTO_API_CATALOG_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'trademark.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"assignments","req":false,"type":"`$ARRAY`","index$":0},{"active":true,"name":"documents","req":false,"type":"`$ARRAY`","index$":1},{"active":true,"name":"serialNumber","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"status","req":false,"type":"`$STRING`","index$":3}],"name":"trademark","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":"xml","kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"search_query","orig":"search_query","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /trademark-assignment/v1.4","json":"{\"operationId\":\"getTrademarkAssignments\",\"parameters\":[{\"description\":\"Search query for trademark assignments\",\"in\":\"query\",\"name\":\"searchQuery\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Response format (xml or json)\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"xml\",\"enum\":[\"xml\",\"json\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"assignments\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}},\"application/xml\":{\"schema\":{\"type\":\"object\"}}},\"description\":\"Successful response with trademark assignment data\"},\"400\":{\"description\":\"Bad request\"},\"401\":{\"description\":\"Unauthorized - API key required\"},\"500\":{\"description\":\"Internal server error\"}},\"security\":[{\"apiKeyAuth\":[]}],\"securitySchemes\":{\"apiKeyAuth\":{\"description\":\"API key required for accessing USPTO APIs. Request an API key from the USPTO Open Data Portal.\",\"in\":\"header\",\"name\":\"X-API-KEY\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/trademark-assignment/v1.4","segments":[{"lit":"trademark-assignment"},{"lit":"v1.4"}],"select":{"exist":["format","search_query"]},"transform":{"req":"`reqdata`","res":"`body.assignments`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"registration_number","orig":"registration_number","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"serial_number","orig":"serial_number","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /tsdr/v1.0","json":"{\"operationId\":\"getTSDRData\",\"parameters\":[{\"description\":\"Trademark serial number\",\"in\":\"query\",\"name\":\"serialNumber\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Trademark registration number\",\"in\":\"query\",\"name\":\"registrationNumber\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"trademarkStatus\":{\"properties\":{\"documents\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"serialNumber\":{\"type\":\"string\"},\"status\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response with trademark status data\"},\"400\":{\"description\":\"Bad request\"},\"401\":{\"description\":\"Unauthorized - API key required\"},\"404\":{\"description\":\"Trademark not found\"},\"500\":{\"description\":\"Internal server error\"}},\"security\":[{\"apiKeyAuth\":[]}],\"securitySchemes\":{\"apiKeyAuth\":{\"description\":\"API key required for accessing USPTO APIs. Request an API key from the USPTO Open Data Portal.\",\"in\":\"header\",\"name\":\"X-API-KEY\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/tsdr/v1.0","segments":[{"lit":"tsdr"},{"lit":"v1.0"}],"select":{"exist":["registration_number","serial_number"]},"transform":{"req":"`reqdata`","res":"`body.trademarkStatus`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"trademark","name__orig":"trademark","Name":"Trademark","name_":"trademark","name-":"trademark","NAME":"TRADEMARK","index$":1}, {"active":true,"entity":"trademark","key$":"BasicTrademarkFlow","kind":"basic","name":"BasicTrademarkFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"trademark_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"trademark_ref01","srcdatavar":"trademark_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-trademark_ref01"}}],"index$":1}]}, 'Trademark')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let trademark_ref01_data = Object.values(setup.data.existing.trademark)[0] as any

    // LIST
    const trademark_ref01_ent = client.Trademark()
    const trademark_ref01_match: any = {}

    const trademark_ref01_list = (await trademark_ref01_ent.list(trademark_ref01_match)).map((e: any) => e.data())


    // LOAD
    const trademark_ref01_match_dt0: any = {}
    const trademark_ref01_data_dt0 = (await trademark_ref01_ent.load(trademark_ref01_match_dt0)).data()
    assert(null != trademark_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/trademark/TrademarkTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = UsptoApiCatalogSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['trademark01','trademark02','trademark03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'USPTO_API_CATALOG_TEST_TRADEMARK_ENTID': idmap,
    'USPTO_API_CATALOG_TEST_LIVE': 'FALSE',
    'USPTO_API_CATALOG_TEST_EXPLAIN': 'FALSE',
    'USPTO_API_CATALOG_APIKEY': '',
  })

  idmap = env['USPTO_API_CATALOG_TEST_TRADEMARK_ENTID']

  const live = 'TRUE' === env.USPTO_API_CATALOG_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['USPTO_API_CATALOG_TEST_TRADEMARK_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new UsptoApiCatalogSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
