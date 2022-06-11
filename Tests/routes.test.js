const superRequest = require('supertest')
const app = require('../app')
const {pool} = require('../dbConfiguration')

const mockSP = require('./__mocks__/storedProcedureMock')

const outputinsertProduct = require('./Endpoint Testing/Output/outputinsertProduct.json')
const outputgetProducts = require('./Endpoint Testing/Output/outputgetProducts.json')
const outputgetOneProduct = require('./Endpoint Testing/Output/outputgetOneProduct.json')
const outputupdateProduct = require('./Endpoint Testing/Output/outputupdateProduct.json')
const outputdeleteProduct = require('./Endpoint Testing/Output/outputdeleteProduct.json')
const outputupsertProduct = require('./Endpoint Testing/Output/outputupsertProduct.json')
const outputpartialUpdateProduct = require('./Endpoint Testing/Output/outputpartialUpdateProduct.json')

beforeEach(async() => {

  // storedProcedure.executeStoredProcedure = jest.fn()
  // let connection = await pool.connect()
})


describe('Tests for insertProduct function', () => {

  test('Testing insertProduct function when all input fields are provided', async() => {
    
    var input = {
        product_id: 101,
        product_name: 'testProduct',
        product_price: 100,
        in_stock: 0
    };

    let connection = await pool.connect()
    const resultSP = await mockSP.executeStoredProcedure(connection, 'insertProduct')
    // storedProcedure.executeStoredProcedure.mockReturnValueOnce(outputinsertProductSP)

    const response = await superRequest(app)
    .post('/products/insertProduct')
    .send(input)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(outputinsertProduct)
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

  test('Testing insertProduct function when all input fields are NOT provided', async() => {
    
    var input = {
        product_id: 101,
        product_name: 'testProduct',
        in_stock: 0
    };

    let connection = await pool.connect()
    await mockSP.executeStoredProcedure(connection, 'insertProduct')
    // storedProcedure.executeStoredProcedure.mockReturnValueOnce(outputinsertProductSP)

    const response = await superRequest(app)
    .post('/products/insertProduct')
    .send(input)

    expect(response.statusCode).toEqual(400)
    expect(response.body).toEqual({
      "error": "Enter all input values(product_id, product_name, product_price, in_stock)"
    })
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
  })
  // test('Testing insertProduct function when product_id is already present', async() => {
  
  //   var input = {
  //       product_id: 101,
  //       product_name: 'testProduct',
  //       product_price: 100,
  //       in_stock: 0
  //   };

  //   // let connection = await pool.connect()
  //   // const resultSP = await mockSP.executeStoredProcedure(connection, 'insertProduct', input)
  //   storedProcedure.executeStoredProcedure = jest.fn()
  //   storedProcedure.executeStoredProcedure.mockReturnValueOnce()
  //   const response = await superRequest(app)
  //   .post('/products/insertProduct')
  //   .send(input)

  //   expect(response.statusCode).toEqual(400)
  //   expect(response.body).toThrow(Error
  //   //   {
  //   //     "error": "Product with id = 101 is already present!"
  //   // }
  //   )
  //   })
})

/********************************************************************/
describe('Tests for getOneProduct function', ()=>{
  test('should fetch a product given a product_id', async () => {
  
    var input = {
      product_id: 3
    };

    let connection = await pool.connect()
    await mockSP.executeStoredProcedure(connection, 'getOneProduct')
    
    const response = await superRequest(app)
    .get('/products/getOneProduct')
    .send(input)

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(outputgetOneProduct)
    })

  test('should not fetch a product for given invalid product_id', async () => {
  
      var input = {
        product_id: ''
      };

      const response = await superRequest(app)
      .get('/products/getOneProduct')
      .send(input)

      expect(response.status).toEqual(400);
      expect(response.body).toEqual({
        error: "Enter a valid product_id"
    })
  })

})
    
/********************************************************************/

describe('Tests for getProducts function', ()=>{
  test('should fetch all the products from the products table', async () => {
  
    let connection = await pool.connect()
    await mockSP.executeStoredProcedure(connection, 'getProducts')
    
    const response = await superRequest(app)
    .get('/products/getProducts')

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(outputgetProducts)
    })

})

/********************************************************************/
describe('Tests for updateProduct function', () => {

  test('Testing updateProduct function when all input fields are provided', async() => {
    
    var input = {
        product_id: 101,
        product_name: 'testProduct',
        product_price: 100,
        in_stock: 0
    };

    let connection = await pool.connect()
    await mockSP.executeStoredProcedure(connection, 'updateProduct')

    const response = await superRequest(app)
    .put('/products/updateProduct')
    .send(input)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(outputupdateProduct)
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

  test('Testing updateProduct function when all input fields are NOT provided', async() => {
    
    var input = {
        product_id: 101,
        in_stock: 0
    };

    const response = await superRequest(app)
    .put('/products/updateProduct')
    .send(input)

    expect(response.statusCode).toEqual(400)
    expect(response.body).toEqual({
      "error": "Enter all input values(product_id, product_name, product_price, in_stock)"
    })
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
  })
})
/********************************************************************/
describe('Tests for partialUpdateProduct function', () => {

  test('Testing partialUpdateProduct function when all input fields are provided', async() => {
    
    var input = {
        product_id: 101,
        product_name: 'testProduct'
    };

    let connection = await pool.connect()
    await mockSP.executeStoredProcedure(connection, 'partialUpdateProduct')

    const response = await superRequest(app)
    .put('/products/partialUpdateProduct')
    .send(input)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(outputpartialUpdateProduct)
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

  test('Testing partialUpdateProduct function when product_id is NOT provided', async() => {
    
    var input = {};

    const response = await superRequest(app)
    .put('/products/partialUpdateProduct')
    .send(input)

    expect(response.statusCode).toEqual(400)
    expect(response.body).toEqual({
      error: "Enter a valid product_id"
    })
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
  })
})
/********************************************************************/
describe('Tests for upsertProduct function', () => {

  test('Testing upsertProduct function when all input fields are provided', async() => {
    
    var input = {
        product_id: 101,
        product_name: 'testProduct',
        product_price: 10,
        in_stock: 0
    };

    let connection = await pool.connect()
    await mockSP.executeStoredProcedure(connection, 'upsertProduct')

    const response = await superRequest(app)
    .post('/products/upsertProduct')
    .send(input)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(outputupsertProduct)
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

  test('Testing upsertProduct function when all input fields are NOT provided', async() => {
    
    var input = {
      product_id: 101,
      in_stock: 0
    };

    const response = await superRequest(app)
    .post('/products/upsertProduct')
    .send(input)

    expect(response.statusCode).toEqual(400)
    expect(response.body).toEqual({
      error: "Enter all input values(product_id, product_name, product_price, in_stock)"
    })
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
  })
})


/********************************************************************/
describe('Tests for deleteProduct function', ()=>{
  test('should delete a product given a product_id', async () => {
  
    var input = {
      product_id: 3
    };

    let connection = await pool.connect()
    await mockSP.executeStoredProcedure(connection, 'deleteProduct')
    
    const response = await superRequest(app)
    .delete('/products/deleteProduct')
    .send(input)

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(outputdeleteProduct)
    })

  test('should not delete a product for given invalid product_id', async () => {
  
      var input = {
        product_id: ''
      };

      const response = await superRequest(app)
      .delete('/products/deleteProduct')
      .send(input)

      expect(response.status).toEqual(400);
      expect(response.body).toEqual({
        error: "Enter a valid product_id"
    })
  })

})


