<?php
declare(strict_types=1);

// UsptoApiCatalog SDK exists test

require_once __DIR__ . '/../usptoapicatalog_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = UsptoApiCatalogSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
