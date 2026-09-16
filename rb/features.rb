# UsptoApiCatalog SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module UsptoApiCatalogFeatures
  def self.make_feature(name)
    case name
    when "base"
      UsptoApiCatalogBaseFeature.new
    when "ratelimit"
      UsptoApiCatalogRatelimitFeature.new
    when "retry"
      UsptoApiCatalogRetryFeature.new
    when "test"
      UsptoApiCatalogTestFeature.new
    when "timeout"
      UsptoApiCatalogTimeoutFeature.new
    else
      UsptoApiCatalogBaseFeature.new
    end
  end
end
