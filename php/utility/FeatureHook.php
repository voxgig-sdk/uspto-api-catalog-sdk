<?php
declare(strict_types=1);

// UsptoApiCatalog SDK utility: feature_hook

class UsptoApiCatalogFeatureHook
{
    public static function call(UsptoApiCatalogContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
