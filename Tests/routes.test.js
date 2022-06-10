const superRequest = require('supertest')
const app = require('../app')
const {pool} = require('../dbConfiguration')
const { validateAllParameters } = require("../Utility/index")
const outputinsertProductSP = require('./__mocks__/outputStoredProcedure/outputInsertProductSP.json')
var storedProcedure = require('../Stored_Procedure/storedProcedure')

const mockSP = require('./__mocks__/storedProcedureMock')

const outputinsertProduct = require('./Endpoint Testing/Output/outputinsertProduct.json')
const outputgetProducts = require('./Endpoint Testing/Output/outputgetProducts.json')
const outputgetOneProduct = require('./Endpoint Testing/Output/outputgetOneProduct.json')
const outputupdateProduct = require('./Endpoint Testing/Output/outputupdateProduct.json')
const outputdeleteProduct = require('./Endpoint Testing/Output/outputdeleteProduct.json')
const outputupsertProduct = require('./Endpoint Testing/Output/outputupsertProduct.json')
const outputpartialUpdateProduct = require('./Endpoint Testing/Output/outputpartialUpdateProduct.json')
const insertProductInput = require('./Validation/Input/insertProductInput.json')


beforeEach(async() => {

  // storedProcedure.executeStoredProcedure = jest.fn()
  // let connection = await pool.connect()
})


describe('Test for Endpoints', () => {

  // test('Testing insertProduct function', async() => {
    
  //   var input = {
  //       product_id: 101,
  //       product_name: 'testProduct',
  //       product_price: 100,
  //       in_stock: 0
  //   };

  //   let connection = await pool.connect()
  //   const resultSP = await mockSP.executeStoredProcedure(connection, 'insertProduct', input)
  //   // storedProcedure.executeStoredProcedure.mockReturnValueOnce(outputinsertProductSP)

  //   const response = await superRequest(app)
  //   .post('/products/insertProduct')
  //   .send(input)

  //   expect(response.statusCode).toEqual(200)
  //   expect(response.body).toEqual(outputinsertProduct)
  //   expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
  //   })

  // test('Testing insertProduct function when all input fields are not provided', async() => {
    
  //   var input = {
  //       product_id: 101,
  //       product_name: 'testProduct',
  //       in_stock: 0
  //   };

  //   let connection = await pool.connect()
  //   const resultSP = await mockSP.executeStoredProcedure(connection, 'insertProduct', input)
  //   // storedProcedure.executeStoredProcedure.mockReturnValueOnce(outputinsertProductSP)

  //   const response = await superRequest(app)
  //   .post('/products/insertProduct')
  //   .send(input)

  //   expect(response.statusCode).toEqual(400)
  //   expect(response.body).toEqual({
  //     "error": "Enter all input values(product_id, product_name, product_price, in_stock)"
  // })
  //   expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
  //   })


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
    //   storedProcedure.executeStoredProcedure.mockReturnValueOnce({})
    //   const response = await superRequest(app)
    //   .post('/products/insertProduct')
    //   .send(input)
  
    //   expect(response.statusCode).toEqual(400)
    //   expect(response.body).toEqual({
    //       "error": "Product with id = 101 is already present!"
    //   })
    //   expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    //   })


/********************************************************************/

  test('should fetch a product given product_id', async () => {
    
    var input = {
      product_id: 3
    };

    let connection = await pool.connect()
    const resultSP = await mockSP.executeStoredProcedure(connection, 'getOneProduct', input)
    // storedProcedure.executeStoredProcedure.mockReturnValueOnce(outputgetOneProduct)
    
    const response = await superRequest(app)
    .get('/products/getOneProduct')
    .send(input)
    .set('Accept','application/json');

    expect(response.status).toEqual(200);
    // console.log(response.body)
    // expect(response.body).toEqual(outputgetOneProduct.recordset)
    })

    // test('should not fetch a product for given invalid product_id', async () => {
    
    //   var request = {
    //     product_id: 100
    //   };

    //   // let connection = await pool.connect()
    //   // const resultSP = await mockSP.executeStoredProcedure(connection, 'getOneProduct', input)
    //   // storedProcedure.executeStoredProcedure.mockReturnValueOnce(outputgetOneProduct)
      
    //   const response = await superRequest(app)
    //   .get('/products/getOneProduct')
    //   .send(request)
    //   .set('Accept','application/json');
    //   console.log(response.body);
    //   //expect(response.status).toEqual(400);
    //   expect(response.body).toEqual({
    //     error: "Product with id = 100 is not present. Please insert it first!"
    // })
    //   })
  
  



  // test('should fetch all the products', async () => {
    
  //   storedProcedure.executeStoredProcedure.mockReturnValueOnce(outputgetProducts)
    
  //   const response = await superRequest(app)
  //   .get('/products/getProducts')
  //   .set('Accept','application/json');
  //   expect(response.status).toEqual(200);
  //   expect(response.body).toEqual(outputgetProducts.recordset)
  //   })


  // test('should update a product', async () => {
    
  //   var request = {
  //       product_id: 101,
  //       product_name: 'testProduct',
  //       product_price: 100,
  //       in_stock: 0
      
  //   };

  //   storedProcedure.executeStoredProcedure.mockReturnValueOnce(outputupdateProduct)
    
  //   const response = await superRequest(app)
  //   .put('/products/updateProduct')
  //   .send(request)
  //   .set('Accept','application/json');
  //   expect(response.status).toEqual(200);
  //   expect(response.body).toEqual(outputupdateProduct)
  //   })
    
  //   test('should upsert a product', async () => {
      
  //     var request = {
  //       product_id: 101,
  //       product_name: 'testProduct',
  //       product_price: 100,
  //       in_stock: 0
  //     };
      
  //     storedProcedure.executeStoredProcedure.mockReturnValueOnce(outputupsertProduct)
      
  //     const response = await superRequest(app)
  //     .post('/products/upsertProduct')
  //     .send(request)
  //     .set('Accept','application/json');
  //     expect(response.status).toEqual(200);
  //     expect(response.body).toEqual(outputupsertProduct)
  //   })
    
  //   test('should partially update a product', async () => {
      
  //     var request = {
  //         product_id: 101,
  //         product_name: 'testProduct',
        
  //     };
  
  //     storedProcedure.executeStoredProcedure.mockReturnValueOnce(outputpartialUpdateProduct)
      
  //     const response = await superRequest(app)
  //     .put('/products/partialUpdateProduct')
  //     .send(request)
  //     .set('Accept','application/json');
  //     expect(response.status).toEqual(200);
  //     expect(response.body).toEqual(outputpartialUpdateProduct)
  //     })

  //   test('should delete a product given a product_id', async () => {
      
  //     var request = {
  //         product_id: 101
        
  //     };
  
  //     storedProcedure.executeStoredProcedure.mockReturnValueOnce(outputdeleteProduct)
      
  //     const response = await superRequest(app)
  //     .delete('/products/deleteProduct')
  //     .send(request)
  //     .set('Accept','application/json');
  //     expect(response.status).toEqual(200);
  //     expect(response.body).toEqual(outputdeleteProduct)
  //     })



  //   test('should create a new object', (done) => {
  
  //     var request = {
  //       method: 'POST',
  //       body: {
  //         product_id: 101,
  //         product_name: 'testProduct', 
  //         product_price: 100,
  //         in_stock: 0
  //       }
  //     };
  
  //     storedProcedure.executeStoredProcedure.mockReturnValueOnce(outputinsertProduct)
  
  //    superRequest(app)
  //       .post('/products/insertProduct')
  //       .send(request)
  //       .set('Accept','application/json')
  //       .expect(200,outputinsertProduct)
  //       .end((err,res)=>{
  //         if(err) return done(err);
  //         return done();
  //       })
  //   })

test("Validation Testing", () => {

  expect(() => validateAllParameters(insertProductInput))
  .toThrow('Enter all input values(product_id, product_name, product_price, in_stock)');
})
    

})
