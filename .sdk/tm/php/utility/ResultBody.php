<?php
declare(strict_types=1);

// UsptoApiCatalog SDK utility: result_body

class UsptoApiCatalogResultBody
{
    public static function call(UsptoApiCatalogContext $ctx): ?UsptoApiCatalogResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
