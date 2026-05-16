<?php
declare(strict_types=1);

// UsptoApiCatalog SDK utility: feature_add

class UsptoApiCatalogFeatureAdd
{
    public static function call(UsptoApiCatalogContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
