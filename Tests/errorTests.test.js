const superRequest = require('supertest')
const app = require('../app')
const {pool} = require('../dbConfiguration')

const outputinsertProductSP = require('./__mocks__/outputStoredProcedure/outputInsertProductSP.json')
var storedProcedure = require('../Stored_Procedure/storedProcedure')

const mockSP = require('./__mocks__/storedProcedureMock')


beforeEach(async() => {

//   storedProcedure.executeStoredProcedure = jest.fn()
  // let connection = await pool.connect()
})


describe('Test for Endpoints', () => {

  test('Testing insertProduct function when all input fields are not provided', async() => {
    
    var input = {
        product_id: 101,
        in_stock: 0
    };

    // let connection = await pool.connect()
    // const resultSP = await mockSP.executeStoredProcedure(connection, 'insertProduct', input)

    const response = await superRequest(app)
    .post('/products/insertProduct')
    .send(input)

    expect(response.statusCode).toEqual(400)
    expect(response.body).toEqual({
      "error": "Enter all input values(product_id, product_name, product_price, in_stock)"
  })
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })


  test('Testing insertProduct function when product_id is already present', async() => {
    
    var input = {
        product_id: 101,
        product_name: 'testProduct',
        product_price: 100,
        in_stock: 0
    };

    // let connection = await pool.connect()
    // const resultSP = await mockSP.executeStoredProcedure(connection, 'insertProduct', input)
    storedProcedure.executeStoredProcedure = jest.fn()
    storedProcedure.executeStoredProcedure.mockReturnValueOnce({})
    const response = await superRequest(app)
    .post('/products/insertProduct')
    .send(input)

    expect(response.statusCode).toEqual(400)
    expect(response.body).toEqual({
        "error": "Product with id = 101 is already present!"
    })
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

})
