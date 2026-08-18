-- UsptoApiCatalog SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "UsptoApiCatalog",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://developer.uspto.gov",
      auth = {
        prefix = "",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["patent"] = {},
        ["trademark"] = {},
      },
    },
    entity = {
      ["patent"] = {
        ["fields"] = {
          {
            ["name"] = "applicationNumber",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "assignee",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "assignmentDate",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "assignmentId",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "assignor",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "citationNumber",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "citationType",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "citations",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "data",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "date",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "patentNumber",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "rejectionText",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "rejectionType",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "text",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "url",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "patent",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "xml",
                      ["kind"] = "query",
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "search_query",
                      ["orig"] = "search_query",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/patent-assignment/v1.4",
                ["parts"] = {
                  "patent-assignment",
                  "v1.4",
                },
                ["select"] = {
                  ["exist"] = {
                    "format",
                    "search_query",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.assignments`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "application_number",
                      ["orig"] = "application_number",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/office-action-citations/v2",
                ["parts"] = {
                  "office-action-citations",
                  "v2",
                },
                ["select"] = {
                  ["exist"] = {
                    "application_number",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.citations`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "application_number",
                      ["orig"] = "application_number",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/office-action-rejections/v2",
                ["parts"] = {
                  "office-action-rejections",
                  "v2",
                },
                ["select"] = {
                  ["exist"] = {
                    "application_number",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.rejections`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "date",
                      ["orig"] = "date",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/office-action-weekly-zips/v1",
                ["parts"] = {
                  "office-action-weekly-zips",
                  "v1",
                },
                ["select"] = {
                  ["exist"] = {
                    "date",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.files`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "patent_number",
                      ["orig"] = "patent_number",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/enriched-citation/v3",
                ["parts"] = {
                  "enriched-citation",
                  "v3",
                },
                ["select"] = {
                  ["exist"] = {
                    "patent_number",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.citations`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "query",
                      ["orig"] = "query",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/ptab/v3",
                ["parts"] = {
                  "ptab",
                  "v3",
                },
                ["select"] = {
                  ["exist"] = {
                    "query",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "application_number",
                      ["orig"] = "application_number",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/office-action-text/v1",
                ["parts"] = {
                  "office-action-text",
                  "v1",
                },
                ["select"] = {
                  ["exist"] = {
                    "application_number",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.officeAction`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["trademark"] = {
        ["fields"] = {
          {
            ["name"] = "assignments",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "documents",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "serialNumber",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "status",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "trademark",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "xml",
                      ["kind"] = "query",
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "search_query",
                      ["orig"] = "search_query",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/trademark-assignment/v1.4",
                ["parts"] = {
                  "trademark-assignment",
                  "v1.4",
                },
                ["select"] = {
                  ["exist"] = {
                    "format",
                    "search_query",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.assignments`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "registration_number",
                      ["orig"] = "registration_number",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "serial_number",
                      ["orig"] = "serial_number",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/tsdr/v1.0",
                ["parts"] = {
                  "tsdr",
                  "v1.0",
                },
                ["select"] = {
                  ["exist"] = {
                    "registration_number",
                    "serial_number",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.trademarkStatus`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
