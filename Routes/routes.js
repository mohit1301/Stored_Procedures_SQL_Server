const express = require('express')
const Router = express.Router()
const{ getProducts, getOneProduct, insertProduct, 
    deleteProduct, updateProduct, upsertProduct, partialUpdateProduct } = require('../Controller/controller')


    
//routes for product operations
Router.get('/getProducts', getProducts)
Router.get('/getOneProduct', getOneProduct)
Router.post('/insertProduct', insertProduct)
Router.put('/updateProduct', updateProduct)
Router.post('/upsertProduct', upsertProduct)
Router.put('/partialUpdateProduct', partialUpdateProduct)
Router.delete('/deleteProduct', deleteProduct)



module.exports = Router