

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


describe('PatentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when USPTO_API_CATALOG_TEST_LIVE=TRUE.
  afterEach(liveDelay('USPTO_API_CATALOG_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = UsptoApiCatalogSDK.test()
    const ent = testsdk.Patent()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.USPTO_API_CATALOG_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'patent.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"applicationNumber":{"a":true,"h":"Application Number","n":"applicationNumber","r":false,"t":"`$STRING`","key$":"applicationNumber","index$":0},"assignee":{"a":true,"h":"Assignee","n":"assignee","r":false,"t":"`$STRING`","key$":"assignee","index$":1},"assignmentDate":{"a":true,"fo":"date","h":"Assignment Date","n":"assignmentDate","r":false,"t":"`$STRING`","key$":"assignmentDate","index$":2},"assignmentId":{"a":true,"h":"Assignment Id","n":"assignmentId","r":false,"t":"`$STRING`","key$":"assignmentId","index$":3},"assignor":{"a":true,"h":"Assignor","n":"assignor","r":false,"t":"`$STRING`","key$":"assignor","index$":4},"citationNumber":{"a":true,"h":"Citation Number","n":"citationNumber","r":false,"t":"`$STRING`","key$":"citationNumber","index$":5},"citationType":{"a":true,"h":"Citation Type","n":"citationType","r":false,"t":"`$STRING`","key$":"citationType","index$":6},"citations":{"a":true,"h":"Citations","n":"citations","r":false,"t":"`$ARRAY`","key$":"citations","index$":7},"data":{"a":true,"h":"Data","n":"data","r":false,"t":"`$ARRAY`","key$":"data","index$":8},"date":{"a":true,"fo":"date","h":"Date","n":"date","r":false,"t":"`$STRING`","key$":"date","index$":9},"patentNumber":{"a":true,"h":"Patent Number","n":"patentNumber","r":false,"t":"`$STRING`","key$":"patentNumber","index$":10},"rejectionText":{"a":true,"h":"Rejection Text","n":"rejectionText","r":false,"t":"`$STRING`","key$":"rejectionText","index$":11},"rejectionType":{"a":true,"h":"Rejection Type","n":"rejectionType","r":false,"t":"`$STRING`","key$":"rejectionType","index$":12},"text":{"a":true,"h":"Text","n":"text","r":false,"t":"`$STRING`","key$":"text","index$":13},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":false,"t":"`$STRING`","key$":"url","index$":14}},"name":"patent","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /patent-assignment/v1.4","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"xml","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"search_query","or":"searchQuery","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/patent-assignment/v1.4","q":{"exist":["format","search_query"]},"r":{},"s":[{"lit":"patent-assignment"},{"lit":"v1.4"}],"t":{"req":"`reqdata`","res":"`body.assignments`"},"index$":0},{"a":true,"co":{"id":"GET /office-action-citations/v2","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"application_number","or":"applicationNumber","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/office-action-citations/v2","q":{"exist":["application_number"]},"r":{},"s":[{"lit":"office-action-citations"},{"lit":"v2"}],"t":{"req":"`reqdata`","res":"`body.citations`"},"index$":1},{"a":true,"co":{"id":"GET /office-action-rejections/v2","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"application_number","or":"applicationNumber","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/office-action-rejections/v2","q":{"exist":["application_number"]},"r":{},"s":[{"lit":"office-action-rejections"},{"lit":"v2"}],"t":{"req":"`reqdata`","res":"`body.rejections`"},"index$":2},{"a":true,"co":{"id":"GET /office-action-weekly-zips/v1","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"date","or":"date","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/office-action-weekly-zips/v1","q":{"exist":["date"]},"r":{},"s":[{"lit":"office-action-weekly-zips"},{"lit":"v1"}],"t":{"req":"`reqdata`","res":"`body.files`"},"index$":3},{"a":true,"co":{"id":"GET /enriched-citation/v3","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"patent_number","or":"patentNumber","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/enriched-citation/v3","q":{"exist":["patent_number"]},"r":{},"s":[{"lit":"enriched-citation"},{"lit":"v3"}],"t":{"req":"`reqdata`","res":"`body.citations`"},"index$":4},{"a":true,"co":{"id":"GET /ptab/v3","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"query","or":"query","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/ptab/v3","q":{"exist":["query"]},"r":{},"s":[{"lit":"ptab"},{"lit":"v3"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":5}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /office-action-text/v1","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"application_number","or":"applicationNumber","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/office-action-text/v1","q":{"exist":["application_number"]},"r":{},"s":[{"lit":"office-action-text"},{"lit":"v1"}],"t":{"req":"`reqdata`","res":"`body.officeAction`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"patent","name__orig":"patent","Name":"Patent","name_":"patent","name-":"patent","NAME":"PATENT","index$":0}, {"active":true,"entity":"patent","key$":"BasicPatentFlow","kind":"basic","name":"BasicPatentFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"patent_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"patent_ref01","srcdatavar":"patent_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-patent_ref01"}}],"index$":1}]}, 'Patent', {"GET /patent-assignment/v1.4":{"protocol":"http","parameters":[{"name":"searchQuery","in":"query","description":"Search query for patent assignments","required":false,"schema":{"type":"string"},"index$":0},{"name":"format","in":"query","description":"Response format (xml or json)","required":false,"schema":{"type":"string","enum":["xml","json"],"default":"xml"},"index$":1}]},"GET /office-action-citations/v2":{"protocol":"http","parameters":[{"name":"applicationNumber","in":"query","description":"Patent application number","required":false,"schema":{"type":"string"},"index$":0}]},"GET /office-action-rejections/v2":{"protocol":"http","parameters":[{"name":"applicationNumber","in":"query","description":"Patent application number","required":false,"schema":{"type":"string"},"index$":0}]},"GET /office-action-weekly-zips/v1":{"protocol":"http","parameters":[{"name":"date","in":"query","description":"Date for the weekly zip file (YYYY-MM-DD format)","required":false,"schema":{"type":"string","format":"date"},"index$":0}]},"GET /enriched-citation/v3":{"protocol":"http","parameters":[{"name":"patentNumber","in":"query","description":"Patent number to retrieve citation data for","required":false,"schema":{"type":"string"},"index$":0}]},"GET /ptab/v3":{"protocol":"http","parameters":[{"name":"query","in":"query","description":"Search query for PTAB data","required":false,"schema":{"type":"string"},"index$":0}]},"GET /office-action-text/v1":{"protocol":"http","parameters":[{"name":"applicationNumber","in":"query","description":"Patent application number","required":false,"schema":{"type":"string"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let patent_ref01_data = Object.values(setup.data.existing.patent)[0] as any

    // LIST
    const patent_ref01_ent = client.Patent()
    const patent_ref01_match: any = {}

    const patent_ref01_list = (await patent_ref01_ent.list(patent_ref01_match)).map((e: any) => e.data())


    // LOAD
    const patent_ref01_match_dt0: any = {}
    const patent_ref01_data_dt0 = (await patent_ref01_ent.load(patent_ref01_match_dt0)).data()
    assert(null != patent_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/patent/PatentTestData.json')

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
    ['patent01','patent02','patent03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'USPTO_API_CATALOG_TEST_PATENT_ENTID': idmap,
    'USPTO_API_CATALOG_TEST_LIVE': 'FALSE',
    'USPTO_API_CATALOG_TEST_EXPLAIN': 'FALSE',
    'USPTO_API_CATALOG_APIKEY': '',
  })

  idmap = env['USPTO_API_CATALOG_TEST_PATENT_ENTID']

  const live = 'TRUE' === env.USPTO_API_CATALOG_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['USPTO_API_CATALOG_TEST_PATENT_ENTID']
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
  
