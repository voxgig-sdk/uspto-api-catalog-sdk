-- UsptoApiCatalog SDK exists test

local sdk = require("uspto-api-catalog_sdk")

describe("UsptoApiCatalogSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
