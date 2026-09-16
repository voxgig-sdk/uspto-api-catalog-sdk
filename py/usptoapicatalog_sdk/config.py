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
            "type": "`$STRING`",
          },
          {
            "name": "assignee",
            "type": "`$STRING`",
          },
          {
            "format": "date",
            "name": "assignmentDate",
            "type": "`$STRING`",
          },
          {
            "name": "assignmentId",
            "type": "`$STRING`",
          },
          {
            "name": "assignor",
            "type": "`$STRING`",
          },
          {
            "name": "citationNumber",
            "type": "`$STRING`",
          },
          {
            "name": "citationType",
            "type": "`$STRING`",
          },
          {
            "name": "citations",
            "type": "`$ARRAY`",
          },
          {
            "name": "data",
            "type": "`$ARRAY`",
          },
          {
            "format": "date",
            "name": "date",
            "type": "`$STRING`",
          },
          {
            "name": "patentNumber",
            "type": "`$STRING`",
          },
          {
            "name": "rejectionText",
            "type": "`$STRING`",
          },
          {
            "name": "rejectionType",
            "type": "`$STRING`",
          },
          {
            "name": "text",
            "type": "`$STRING`",
          },
          {
            "format": "uri",
            "name": "url",
            "type": "`$STRING`",
          },
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
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "search_query",
                      "orig": "search_query",
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "format",
                    "search_query",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.assignments`",
                },
                "parts": [
                  "patent-assignment",
                  "v1.4",
                ],
              },
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "application_number",
                      "orig": "application_number",
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "application_number",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.citations`",
                },
                "parts": [
                  "office-action-citations",
                  "v2",
                ],
              },
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "application_number",
                      "orig": "application_number",
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "application_number",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.rejections`",
                },
                "parts": [
                  "office-action-rejections",
                  "v2",
                ],
              },
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "date",
                      "orig": "date",
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "date",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.files`",
                },
                "parts": [
                  "office-action-weekly-zips",
                  "v1",
                ],
              },
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "patent_number",
                      "orig": "patent_number",
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "patent_number",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.citations`",
                },
                "parts": [
                  "enriched-citation",
                  "v3",
                ],
              },
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "query",
                      "orig": "query",
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "query",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "ptab",
                  "v3",
                ],
              },
            ],
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
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "application_number",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.officeAction`",
                },
                "parts": [
                  "office-action-text",
                  "v1",
                ],
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
            "type": "`$ARRAY`",
          },
          {
            "name": "documents",
            "type": "`$ARRAY`",
          },
          {
            "name": "serialNumber",
            "type": "`$STRING`",
          },
          {
            "name": "status",
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
                "args": {
                  "query": [
                    {
                      "example": "xml",
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "search_query",
                      "orig": "search_query",
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "format",
                    "search_query",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.assignments`",
                },
                "parts": [
                  "trademark-assignment",
                  "v1.4",
                ],
              },
            ],
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
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "serial_number",
                      "orig": "serial_number",
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "registration_number",
                    "serial_number",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.trademarkStatus`",
                },
                "parts": [
                  "tsdr",
                  "v1.0",
                ],
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
