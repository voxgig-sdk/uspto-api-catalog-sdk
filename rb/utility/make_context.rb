# UsptoApiCatalog SDK utility: make_context
require_relative '../core/context'
module UsptoApiCatalogUtilities
  MakeContext = ->(ctxmap, basectx) {
    UsptoApiCatalogContext.new(ctxmap, basectx)
  }
end
