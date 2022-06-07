const request = require('supertest')
const app = require('../app')

var storedProcedure = require('../Stored_Procedure/storedProcedure')
const productController = require('../Controller/controller')
const outputgetProducts = require('./Output Paramters/outputgetProducts.json')
const outputgetOneProduct = require('./Output Paramters/outputgetOneProduct.json')
const outputinsertProduct = require('./Output Paramters/outputinsertProduct.json')
const outputupdateProduct = require('./Output Paramters/outputupdateProduct.json')
const outputdeleteProduct = require('./Output Paramters/outputdeleteProduct.json')

beforeAll(() => {
  
    storedProcedure.executeStoredProcedure = jest.fn()
})
describe('Test for Endpoints', () => {

    test('testing insertProduct function', async () => {

        storedProcedure.executeStoredProcedure.mockResolvedValueOnce(outputinsertProduct)

        const result = await productController.insertProduct({}, {});
        expect(result).toEqual(outputinsertProduct);
    })

    test('testing getProducts function', async () => {

        storedProcedure.executeStoredProcedure.mockResolvedValueOnce({recordset: outputgetProducts})

        const result = await productController.getProducts({}, {});
        expect(result).toEqual(outputgetProducts);
        // await expect(productController.getProducts({}, {})).resolves.toBe();
    })

    test('testing getOneProduct function',  function done() {

        storedProcedure.executeStoredProcedure.mockResolvedValueOnce({recordset: outputgetOneProduct})

        // request(app).get('/getProduct')
        // .expect(outputgetOneProduct)
        // .expect(200, done)

        const result = await productController.getOneProduct({}, {});
        expect(result).toEqual(outputgetOneProduct);
    })


    test('testing updateProduct function', async () => {

        storedProcedure.executeStoredProcedure.mockReturnValue(outputupdateProduct)

        const result = await productController.updateProduct({}, {});
        expect(result).toEqual(outputupdateProduct);
    })

    test('testing deleteProduct function', async () => {

        storedProcedure.executeStoredProcedure.mockReturnValue(outputdeleteProduct)

        const result = await productController.deleteProduct({}, {});
        expect(result).toEqual(outputdeleteProduct);
    })

})





