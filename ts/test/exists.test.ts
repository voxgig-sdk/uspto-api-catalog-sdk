
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { UsptoApiCatalogSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await UsptoApiCatalogSDK.test()
    equal(null !== testsdk, true)
  })

})
