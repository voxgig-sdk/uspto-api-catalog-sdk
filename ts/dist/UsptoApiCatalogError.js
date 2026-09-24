"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsptoApiCatalogError = void 0;
class UsptoApiCatalogError extends Error {
    isUsptoApiCatalogError = true;
    sdk = 'UsptoApiCatalog';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.UsptoApiCatalogError = UsptoApiCatalogError;
//# sourceMappingURL=UsptoApiCatalogError.js.map