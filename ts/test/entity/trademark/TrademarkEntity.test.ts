

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"assignments":{"a":true,"h":"Assignments","n":"assignments","r":false,"t":"`$ARRAY`","key$":"assignments","index$":0},"documents":{"a":true,"h":"Documents","n":"documents","r":false,"t":"`$ARRAY`","key$":"documents","index$":1},"serialNumber":{"a":true,"h":"Serial Number","n":"serialNumber","r":false,"t":"`$STRING`","key$":"serialNumber","index$":2},"status":{"a":true,"h":"Status","n":"status","r":false,"t":"`$STRING`","key$":"status","index$":3}},"name":"trademark","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /trademark-assignment/v1.4","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"xml","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"search_query","or":"searchQuery","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/trademark-assignment/v1.4","q":{"exist":["format","search_query"]},"r":{},"s":[{"lit":"trademark-assignment"},{"lit":"v1.4"}],"t":{"req":"`reqdata`","res":"`body.assignments`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /tsdr/v1.0","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"registration_number","or":"registrationNumber","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"serial_number","or":"serialNumber","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/tsdr/v1.0","q":{"exist":["registration_number","serial_number"]},"r":{},"s":[{"lit":"tsdr"},{"lit":"v1.0"}],"t":{"req":"`reqdata`","res":"`body.trademarkStatus`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"trademark","name__orig":"trademark","Name":"Trademark","name_":"trademark","name-":"trademark","NAME":"TRADEMARK","index$":1}, {"active":true,"entity":"trademark","key$":"BasicTrademarkFlow","kind":"basic","name":"BasicTrademarkFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"trademark_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"trademark_ref01","srcdatavar":"trademark_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-trademark_ref01"}}],"index$":1}]}, 'Trademark', {"GET /trademark-assignment/v1.4":{"protocol":"http","parameters":[{"name":"searchQuery","in":"query","description":"Search query for trademark assignments","required":false,"schema":{"type":"string"},"index$":0},{"name":"format","in":"query","description":"Response format (xml or json)","required":false,"schema":{"type":"string","enum":["xml","json"],"default":"xml"},"index$":1}]},"GET /tsdr/v1.0":{"protocol":"http","parameters":[{"name":"serialNumber","in":"query","description":"Trademark serial number","required":false,"schema":{"type":"string"},"index$":0},{"name":"registrationNumber","in":"query","description":"Trademark registration number","required":false,"schema":{"type":"string"},"index$":1}]}})
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
  
