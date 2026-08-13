# UsptoApiCatalog SDK feature factory

from usptoapicatalog_sdk.feature.base_feature import UsptoApiCatalogBaseFeature
from usptoapicatalog_sdk.feature.test_feature import UsptoApiCatalogTestFeature


def _make_feature(name):
    features = {
        "base": lambda: UsptoApiCatalogBaseFeature(),
        "test": lambda: UsptoApiCatalogTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
