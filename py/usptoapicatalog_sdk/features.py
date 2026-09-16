# UsptoApiCatalog SDK feature factory

from usptoapicatalog_sdk.feature.base_feature import UsptoApiCatalogBaseFeature
from usptoapicatalog_sdk.feature.ratelimit_feature import UsptoApiCatalogRatelimitFeature
from usptoapicatalog_sdk.feature.retry_feature import UsptoApiCatalogRetryFeature
from usptoapicatalog_sdk.feature.test_feature import UsptoApiCatalogTestFeature
from usptoapicatalog_sdk.feature.timeout_feature import UsptoApiCatalogTimeoutFeature


_FEATURES = {
    "base": lambda: UsptoApiCatalogBaseFeature(),
    "ratelimit": lambda: UsptoApiCatalogRatelimitFeature(),
    "retry": lambda: UsptoApiCatalogRetryFeature(),
    "test": lambda: UsptoApiCatalogTestFeature(),
    "timeout": lambda: UsptoApiCatalogTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
