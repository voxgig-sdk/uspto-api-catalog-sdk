# UsptoApiCatalog SDK utility: make_context

from usptoapicatalog_sdk.core.context import UsptoApiCatalogContext


def make_context_util(ctxmap, basectx):
    return UsptoApiCatalogContext(ctxmap, basectx)
