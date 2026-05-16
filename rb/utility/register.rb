# UsptoApiCatalog SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

UsptoApiCatalogUtility.registrar = ->(u) {
  u.clean = UsptoApiCatalogUtilities::Clean
  u.done = UsptoApiCatalogUtilities::Done
  u.make_error = UsptoApiCatalogUtilities::MakeError
  u.feature_add = UsptoApiCatalogUtilities::FeatureAdd
  u.feature_hook = UsptoApiCatalogUtilities::FeatureHook
  u.feature_init = UsptoApiCatalogUtilities::FeatureInit
  u.fetcher = UsptoApiCatalogUtilities::Fetcher
  u.make_fetch_def = UsptoApiCatalogUtilities::MakeFetchDef
  u.make_context = UsptoApiCatalogUtilities::MakeContext
  u.make_options = UsptoApiCatalogUtilities::MakeOptions
  u.make_request = UsptoApiCatalogUtilities::MakeRequest
  u.make_response = UsptoApiCatalogUtilities::MakeResponse
  u.make_result = UsptoApiCatalogUtilities::MakeResult
  u.make_point = UsptoApiCatalogUtilities::MakePoint
  u.make_spec = UsptoApiCatalogUtilities::MakeSpec
  u.make_url = UsptoApiCatalogUtilities::MakeUrl
  u.param = UsptoApiCatalogUtilities::Param
  u.prepare_auth = UsptoApiCatalogUtilities::PrepareAuth
  u.prepare_body = UsptoApiCatalogUtilities::PrepareBody
  u.prepare_headers = UsptoApiCatalogUtilities::PrepareHeaders
  u.prepare_method = UsptoApiCatalogUtilities::PrepareMethod
  u.prepare_params = UsptoApiCatalogUtilities::PrepareParams
  u.prepare_path = UsptoApiCatalogUtilities::PreparePath
  u.prepare_query = UsptoApiCatalogUtilities::PrepareQuery
  u.result_basic = UsptoApiCatalogUtilities::ResultBasic
  u.result_body = UsptoApiCatalogUtilities::ResultBody
  u.result_headers = UsptoApiCatalogUtilities::ResultHeaders
  u.transform_request = UsptoApiCatalogUtilities::TransformRequest
  u.transform_response = UsptoApiCatalogUtilities::TransformResponse
}
