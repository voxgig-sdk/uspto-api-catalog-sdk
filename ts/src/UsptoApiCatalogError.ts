
import { Context } from './Context'


class UsptoApiCatalogError extends Error {

  isUsptoApiCatalogError = true

  sdk = 'UsptoApiCatalog'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  UsptoApiCatalogError
}

