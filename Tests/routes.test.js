const superRequest = require('supertest')
const app = require('../app')

var storedProcedure = require('../Stored_Procedure/storedProcedure')
const outputinsertProduct = require('./Output Paramters/outputinsertProduct.json')
const outputgetProducts = require('./Output Paramters/outputgetProducts.json')
const outputgetOneProduct = require('./Output Paramters/outputgetOneProduct.json')
const outputupdateProduct = require('./Output Paramters/outputupdateProduct.json')
const outputdeleteProduct = require('./Output Paramters/outputdeleteProduct.json')
const outputupsertProduct = require('./Output Paramters/outputupsertProduct.json')
const outputpartialUpdateProduct = require('./Output Paramters/outputpartialUpdateProduct.json')


beforeAll(() => {

  storedProcedure.executeStoredProcedure = jest.fn()
})


describe('Test for Endpoints', () => {

  test('should create a new product', async () => {
    
    var request = {
      method: 'POST',
      body: {
        product_id: 101,
        product_name: 'testProduct',
        product_price: 100,
        in_stock: 0
      }
    };

    storedProcedure.executeStoredProcedure.mockReturnValueOnce(outputinsertProduct)
    
    const response = await superRequest(app)
    .post('/products/insertProduct')
    .send(request)
    .set('Accept','application/json');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(outputinsertProduct)
    })


  test('should fetch a product given product_id', async () => {
    
    var request = {
      product_id: 3
    };

    storedProcedure.executeStoredProcedure.mockReturnValueOnce(outputgetOneProduct)
    
    const response = await superRequest(app)
    .get('/products/getOneProduct')
    .send(request)
    .set('Accept','application/json');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(outputgetOneProduct.recordset)
    })


  test('should fetch all the products', async () => {
    
    var request = {
      method: 'GET'
    };

    storedProcedure.executeStoredProcedure.mockReturnValueOnce(outputgetProducts)
    
    const response = await superRequest(app)
    .get('/products/getProducts')
    .send(request)
    .set('Accept','application/json');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(outputgetProducts.recordset)
    })


  test('should update a product', async () => {
    
    var request = {
        product_id: 101,
        product_name: 'testProduct',
        product_price: 100,
        in_stock: 0
      
    };

    storedProcedure.executeStoredProcedure.mockReturnValueOnce(outputupdateProduct)
    
    const response = await superRequest(app)
    .put('/products/updateProduct')
    .send(request)
    .set('Accept','application/json');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(outputupdateProduct)
    })
    
    test('should upsert a product', async () => {
      
      var request = {
        product_id: 101,
        product_name: 'testProduct',
        product_price: 100,
        in_stock: 0
      };
      
      storedProcedure.executeStoredProcedure.mockReturnValueOnce(outputupsertProduct)
      
      const response = await superRequest(app)
      .post('/products/upsertProduct')
      .send(request)
      .set('Accept','application/json');
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(outputupsertProduct)
    })
    
    test('should partially update a product', async () => {
      
      var request = {
          product_id: 101,
          product_name: 'testProduct',
        
      };
  
      storedProcedure.executeStoredProcedure.mockReturnValueOnce(outputpartialUpdateProduct)
      
      const response = await superRequest(app)
      .put('/products/partialUpdateProduct')
      .send(request)
      .set('Accept','application/json');
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(outputpartialUpdateProduct)
      })

    test('should delete a product given a product_id', async () => {
      
      var request = {
          product_id: 101
        
      };
  
      storedProcedure.executeStoredProcedure.mockReturnValueOnce(outputdeleteProduct)
      
      const response = await superRequest(app)
      .delete('/products/deleteProduct')
      .send(request)
      .set('Accept','application/json');
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(outputdeleteProduct)
      })



    // test('should create a new object', (done) => {
  
    //   var request = {
    //     method: 'POST',
    //     body: {
    //       product_id: 101,
    //       product_name: 'testProduct', 
    //       product_price: 100,
    //       in_stock: 0
    //     }
    //   };
  
    //   storedProcedure.executeStoredProcedure.mockReturnValueOnce(outputinsertProduct)
  
    //  superRequest(app)
    //     .post('/products/insertProduct')
    //     .send(request)
    //     .set('Accept','application/json')
    //     .expect(200,outputinsertProduct)
    //     .end((err,res)=>{
    //       if(err) return done(err);
    //       return done();
    //     })
    // })


    

})
