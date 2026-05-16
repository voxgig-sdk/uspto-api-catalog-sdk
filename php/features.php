<?php
declare(strict_types=1);

// UsptoApiCatalog SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class UsptoApiCatalogFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new UsptoApiCatalogBaseFeature();
            case "test":
                return new UsptoApiCatalogTestFeature();
            default:
                return new UsptoApiCatalogBaseFeature();
        }
    }
}
