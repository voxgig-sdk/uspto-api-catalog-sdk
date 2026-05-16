# UsptoApiCatalog SDK exists test

require "minitest/autorun"
require_relative "../UsptoApiCatalog_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = UsptoApiCatalogSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
