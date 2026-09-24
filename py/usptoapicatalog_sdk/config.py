# UsptoApiCatalog SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "UsptoApiCatalog",
            "slug": "uspto-api-catalog",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://developer.uspto.gov",
            "auth": {
                "prefix": "",
                "name": "X-API-KEY",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "patent": {},
                "trademark": {},
            },
        },
        "entity": {
      "patent": {
        "fields": [
          {
            "name": "applicationNumber",
            "title": "Application Number",
            "type": "`$STRING`",
          },
          {
            "name": "assignee",
            "title": "Assignee",
            "type": "`$STRING`",
          },
          {
            "name": "assignmentDate",
            "title": "Assignment Date",
            "type": "`$STRING`",
            "format": "date",
          },
          {
            "name": "assignmentId",
            "title": "Assignment Id",
            "type": "`$STRING`",
          },
          {
            "name": "assignor",
            "title": "Assignor",
            "type": "`$STRING`",
          },
          {
            "name": "citationNumber",
            "title": "Citation Number",
            "type": "`$STRING`",
          },
          {
            "name": "citationType",
            "title": "Citation Type",
            "type": "`$STRING`",
          },
          {
            "name": "citations",
            "title": "Citations",
            "type": "`$ARRAY`",
          },
          {
            "name": "data",
            "title": "Data",
            "type": "`$ARRAY`",
          },
          {
            "name": "date",
            "title": "Date",
            "type": "`$STRING`",
            "format": "date",
          },
          {
            "name": "patentNumber",
            "title": "Patent Number",
            "type": "`$STRING`",
          },
          {
            "name": "rejectionText",
            "title": "Rejection Text",
            "type": "`$STRING`",
          },
          {
            "name": "rejectionType",
            "title": "Rejection Type",
            "type": "`$STRING`",
          },
          {
            "name": "text",
            "title": "Text",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "title": "Url",
            "type": "`$STRING`",
            "format": "uri",
          },
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
                "orig": "/patent-assignment/v1.4",
                "segments": [
                  {
                    "lit": "patent-assignment",
                  },
                  {
                    "lit": "v1.4",
                  },
                ],
                "parts": [
                  "patent-assignment",
                  "v1.4",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.assignments`",
                },
                "args": {
                  "query": [
                    {
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "xml",
                    },
                    {
                      "name": "search_query",
                      "orig": "search_query",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "format",
                    "search_query",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/office-action-citations/v2",
                "segments": [
                  {
                    "lit": "office-action-citations",
                  },
                  {
                    "lit": "v2",
                  },
                ],
                "parts": [
                  "office-action-citations",
                  "v2",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.citations`",
                },
                "args": {
                  "query": [
                    {
                      "name": "application_number",
                      "orig": "application_number",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "application_number",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/office-action-rejections/v2",
                "segments": [
                  {
                    "lit": "office-action-rejections",
                  },
                  {
                    "lit": "v2",
                  },
                ],
                "parts": [
                  "office-action-rejections",
                  "v2",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.rejections`",
                },
                "args": {
                  "query": [
                    {
                      "name": "application_number",
                      "orig": "application_number",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "application_number",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/office-action-weekly-zips/v1",
                "segments": [
                  {
                    "lit": "office-action-weekly-zips",
                  },
                  {
                    "lit": "v1",
                  },
                ],
                "parts": [
                  "office-action-weekly-zips",
                  "v1",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.files`",
                },
                "args": {
                  "query": [
                    {
                      "name": "date",
                      "orig": "date",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "date",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/enriched-citation/v3",
                "segments": [
                  {
                    "lit": "enriched-citation",
                  },
                  {
                    "lit": "v3",
                  },
                ],
                "parts": [
                  "enriched-citation",
                  "v3",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.citations`",
                },
                "args": {
                  "query": [
                    {
                      "name": "patent_number",
                      "orig": "patent_number",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "patent_number",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/ptab/v3",
                "segments": [
                  {
                    "lit": "ptab",
                  },
                  {
                    "lit": "v3",
                  },
                ],
                "parts": [
                  "ptab",
                  "v3",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "query",
                      "orig": "query",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "query",
                  ],
                },
              },
            ],
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
                    "lit": "office-action-text",
                  },
                  {
                    "lit": "v1",
                  },
                ],
                "parts": [
                  "office-action-text",
                  "v1",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.officeAction`",
                },
                "args": {
                  "query": [
                    {
                      "name": "application_number",
                      "orig": "application_number",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "application_number",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "trademark": {
        "fields": [
          {
            "name": "assignments",
            "title": "Assignments",
            "type": "`$ARRAY`",
          },
          {
            "name": "documents",
            "title": "Documents",
            "type": "`$ARRAY`",
          },
          {
            "name": "serialNumber",
            "title": "Serial Number",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
          },
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
                    "lit": "trademark-assignment",
                  },
                  {
                    "lit": "v1.4",
                  },
                ],
                "parts": [
                  "trademark-assignment",
                  "v1.4",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.assignments`",
                },
                "args": {
                  "query": [
                    {
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "xml",
                    },
                    {
                      "name": "search_query",
                      "orig": "search_query",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "format",
                    "search_query",
                  ],
                },
              },
            ],
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
                    "lit": "tsdr",
                  },
                  {
                    "lit": "v1.0",
                  },
                ],
                "parts": [
                  "tsdr",
                  "v1.0",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.trademarkStatus`",
                },
                "args": {
                  "query": [
                    {
                      "name": "registration_number",
                      "orig": "registration_number",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "serial_number",
                      "orig": "serial_number",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "registration_number",
                    "serial_number",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
