
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { UsptoApiCatalogSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = UsptoApiCatalogSDK.test()
    equal(testsdk instanceof UsptoApiCatalogSDK, true,
      'UsptoApiCatalogSDK.test() must return a client synchronously')
  })

})
