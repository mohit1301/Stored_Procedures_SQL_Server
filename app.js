const express = require('express')
const app = express()
const productRoutes = require('./Routes/routes')
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


app.use('/products', productRoutes )

module.exports = app