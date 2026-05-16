<?php
declare(strict_types=1);

// UsptoApiCatalog SDK utility: result_headers

class UsptoApiCatalogResultHeaders
{
    public static function call(UsptoApiCatalogContext $ctx): ?UsptoApiCatalogResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
