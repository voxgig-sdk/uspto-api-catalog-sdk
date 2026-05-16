# UsptoApiCatalog SDK utility: feature_add
module UsptoApiCatalogUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
