
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'UsptoApiCatalog',
        slug: "uspto-api-catalog",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
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
 retry:     {
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
 test:     {
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
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "now": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


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
      
        patent: {
        },
  
        trademark: {
        },
  
    }
  }


  entity = {
    "patent": {
      "fields": [
        {
          "name": "applicationNumber",
          "title": "Application Number",
          "type": "`$STRING`"
        },
        {
          "name": "assignee",
          "title": "Assignee",
          "type": "`$STRING`"
        },
        {
          "name": "assignmentDate",
          "title": "Assignment Date",
          "type": "`$STRING`",
          "format": "date"
        },
        {
          "name": "assignmentId",
          "title": "Assignment Id",
          "type": "`$STRING`"
        },
        {
          "name": "assignor",
          "title": "Assignor",
          "type": "`$STRING`"
        },
        {
          "name": "citationNumber",
          "title": "Citation Number",
          "type": "`$STRING`"
        },
        {
          "name": "citationType",
          "title": "Citation Type",
          "type": "`$STRING`"
        },
        {
          "name": "citations",
          "title": "Citations",
          "type": "`$ARRAY`"
        },
        {
          "name": "data",
          "title": "Data",
          "type": "`$ARRAY`"
        },
        {
          "name": "date",
          "title": "Date",
          "type": "`$STRING`",
          "format": "date"
        },
        {
          "name": "patentNumber",
          "title": "Patent Number",
          "type": "`$STRING`"
        },
        {
          "name": "rejectionText",
          "title": "Rejection Text",
          "type": "`$STRING`"
        },
        {
          "name": "rejectionType",
          "title": "Rejection Type",
          "type": "`$STRING`"
        },
        {
          "name": "text",
          "title": "Text",
          "type": "`$STRING`"
        },
        {
          "name": "url",
          "title": "Url",
          "type": "`$STRING`",
          "format": "uri"
        }
      ],
      "name": "patent",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
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
              "parts": [
                "enriched-citation",
                "v3"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.citations`"
              },
              "args": {
                "query": [
                  {
                    "name": "patent_number",
                    "orig": "patentNumber",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
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
              "parts": [
                "office-action-citations",
                "v2"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.citations`"
              },
              "args": {
                "query": [
                  {
                    "name": "application_number",
                    "orig": "applicationNumber",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
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
              "parts": [
                "office-action-rejections",
                "v2"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.rejections`"
              },
              "args": {
                "query": [
                  {
                    "name": "application_number",
                    "orig": "applicationNumber",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
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
              "parts": [
                "office-action-weekly-zips",
                "v1"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.files`"
              },
              "args": {
                "query": [
                  {
                    "name": "date",
                    "orig": "date",
                    "type": "`$STRING`",
                    "kind": "query",
                    "field": true
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
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
              "parts": [
                "patent-assignment",
                "v1.4"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.assignments`"
              },
              "args": {
                "query": [
                  {
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "xml"
                  },
                  {
                    "name": "search_query",
                    "orig": "searchQuery",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "alternatives": [
                  {
                    "kind": "raw",
                    "media": "application/xml"
                  }
                ],
                "kind": "json",
                "media": "application/json"
              }
            },
            {
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
              "parts": [
                "ptab",
                "v3"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "query": [
                  {
                    "name": "query",
                    "orig": "query",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
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
              "parts": [
                "office-action-text",
                "v1"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.officeAction`"
              },
              "args": {
                "query": [
                  {
                    "name": "application_number",
                    "orig": "applicationNumber",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
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
          "title": "Assignments",
          "type": "`$ARRAY`"
        },
        {
          "name": "documents",
          "title": "Documents",
          "type": "`$ARRAY`"
        },
        {
          "name": "serialNumber",
          "title": "Serial Number",
          "type": "`$STRING`"
        },
        {
          "name": "status",
          "title": "Status",
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
              "parts": [
                "trademark-assignment",
                "v1.4"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.assignments`"
              },
              "args": {
                "query": [
                  {
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "xml"
                  },
                  {
                    "name": "search_query",
                    "orig": "searchQuery",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "alternatives": [
                  {
                    "kind": "raw",
                    "media": "application/xml"
                  }
                ],
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
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
              "parts": [
                "tsdr",
                "v1.0"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.trademarkStatus`"
              },
              "args": {
                "query": [
                  {
                    "name": "registration_number",
                    "orig": "registrationNumber",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "serial_number",
                    "orig": "serialNumber",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

