# UsptoApiCatalog SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module UsptoApiCatalogFeatures
  def self.make_feature(name)
    case name
    when "base"
      UsptoApiCatalogBaseFeature.new
    when "test"
      UsptoApiCatalogTestFeature.new
    else
      UsptoApiCatalogBaseFeature.new
    end
  end
end
