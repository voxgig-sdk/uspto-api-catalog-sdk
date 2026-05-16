-- UsptoApiCatalog SDK error

local UsptoApiCatalogError = {}
UsptoApiCatalogError.__index = UsptoApiCatalogError


function UsptoApiCatalogError.new(code, msg, ctx)
  local self = setmetatable({}, UsptoApiCatalogError)
  self.is_sdk_error = true
  self.sdk = "UsptoApiCatalog"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function UsptoApiCatalogError:error()
  return self.msg
end


function UsptoApiCatalogError:__tostring()
  return self.msg
end


return UsptoApiCatalogError
