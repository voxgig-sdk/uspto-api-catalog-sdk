import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
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
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "applicationNumber"
    ],
    "queryArgs": [
      {
        "name": "application_number",
        "wire": "applicationNumber"
      }
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
      "format": "xml",
      "search_query": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/xml",
      "application/json"
    ],
    "query": [
      "searchQuery",
      "format"
    ],
    "queryArgs": [
      {
        "name": "format",
        "wire": "format"
      },
      {
        "name": "search_query",
        "wire": "searchQuery"
      }
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
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "serialNumber",
      "registrationNumber"
    ],
    "queryArgs": [
      {
        "name": "registration_number",
        "wire": "registrationNumber"
      },
      {
        "name": "serial_number",
        "wire": "serialNumber"
      }
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
        "serialNumber": "x",
        "status": "x",
        "documents": [
          {}
        ]
      }
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
