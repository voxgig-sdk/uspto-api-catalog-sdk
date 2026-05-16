# ProjectName SDK exists test

import pytest
from usptoapicatalog_sdk import UsptoApiCatalogSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = UsptoApiCatalogSDK.test(None, None)
        assert testsdk is not None
