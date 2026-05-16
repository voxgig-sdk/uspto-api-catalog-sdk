<?php
declare(strict_types=1);

// UsptoApiCatalog SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

UsptoApiCatalogUtility::setRegistrar(function (UsptoApiCatalogUtility $u): void {
    $u->clean = [UsptoApiCatalogClean::class, 'call'];
    $u->done = [UsptoApiCatalogDone::class, 'call'];
    $u->make_error = [UsptoApiCatalogMakeError::class, 'call'];
    $u->feature_add = [UsptoApiCatalogFeatureAdd::class, 'call'];
    $u->feature_hook = [UsptoApiCatalogFeatureHook::class, 'call'];
    $u->feature_init = [UsptoApiCatalogFeatureInit::class, 'call'];
    $u->fetcher = [UsptoApiCatalogFetcher::class, 'call'];
    $u->make_fetch_def = [UsptoApiCatalogMakeFetchDef::class, 'call'];
    $u->make_context = [UsptoApiCatalogMakeContext::class, 'call'];
    $u->make_options = [UsptoApiCatalogMakeOptions::class, 'call'];
    $u->make_request = [UsptoApiCatalogMakeRequest::class, 'call'];
    $u->make_response = [UsptoApiCatalogMakeResponse::class, 'call'];
    $u->make_result = [UsptoApiCatalogMakeResult::class, 'call'];
    $u->make_point = [UsptoApiCatalogMakePoint::class, 'call'];
    $u->make_spec = [UsptoApiCatalogMakeSpec::class, 'call'];
    $u->make_url = [UsptoApiCatalogMakeUrl::class, 'call'];
    $u->param = [UsptoApiCatalogParam::class, 'call'];
    $u->prepare_auth = [UsptoApiCatalogPrepareAuth::class, 'call'];
    $u->prepare_body = [UsptoApiCatalogPrepareBody::class, 'call'];
    $u->prepare_headers = [UsptoApiCatalogPrepareHeaders::class, 'call'];
    $u->prepare_method = [UsptoApiCatalogPrepareMethod::class, 'call'];
    $u->prepare_params = [UsptoApiCatalogPrepareParams::class, 'call'];
    $u->prepare_path = [UsptoApiCatalogPreparePath::class, 'call'];
    $u->prepare_query = [UsptoApiCatalogPrepareQuery::class, 'call'];
    $u->result_basic = [UsptoApiCatalogResultBasic::class, 'call'];
    $u->result_body = [UsptoApiCatalogResultBody::class, 'call'];
    $u->result_headers = [UsptoApiCatalogResultHeaders::class, 'call'];
    $u->transform_request = [UsptoApiCatalogTransformRequest::class, 'call'];
    $u->transform_response = [UsptoApiCatalogTransformResponse::class, 'call'];
});
