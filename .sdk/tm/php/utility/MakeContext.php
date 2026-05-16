<?php
declare(strict_types=1);

// UsptoApiCatalog SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class UsptoApiCatalogMakeContext
{
    public static function call(array $ctxmap, ?UsptoApiCatalogContext $basectx): UsptoApiCatalogContext
    {
        return new UsptoApiCatalogContext($ctxmap, $basectx);
    }
}
