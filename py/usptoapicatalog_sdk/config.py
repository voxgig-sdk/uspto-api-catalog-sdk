# UsptoApiCatalog SDK configuration


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
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
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
                "parts": [
                  "patent-assignment",
                  "v1.4",
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
                "parts": [
                  "office-action-citations",
                  "v2",
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
                "parts": [
                  "office-action-rejections",
                  "v2",
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
                "parts": [
                  "office-action-weekly-zips",
                  "v1",
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
                "parts": [
                  "enriched-citation",
                  "v3",
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
                "parts": [
                  "ptab",
                  "v3",
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
                "parts": [
                  "office-action-text",
                  "v1",
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
                "parts": [
                  "trademark-assignment",
                  "v1.4",
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
                "parts": [
                  "tsdr",
                  "v1.0",
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
