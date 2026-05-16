<?php
declare(strict_types=1);

// UsptoApiCatalog SDK utility: prepare_body

class UsptoApiCatalogPrepareBody
{
    public static function call(UsptoApiCatalogContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
