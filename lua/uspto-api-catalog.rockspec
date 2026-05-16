package = "voxgig-sdk-uspto-api-catalog"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/uspto-api-catalog-sdk.git"
}
description = {
  summary = "UsptoApiCatalog SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["uspto-api-catalog_sdk"] = "uspto-api-catalog_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
