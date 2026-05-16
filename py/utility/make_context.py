# UsptoApiCatalog SDK utility: make_context

from core.context import UsptoApiCatalogContext


def make_context_util(ctxmap, basectx):
    return UsptoApiCatalogContext(ctxmap, basectx)
