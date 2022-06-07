const storedProcedure = require('../Stored_Procedure/storedProcedure')
const { pool } = require('../dbConfiguration')

//controller for fetching all products from products table
exports.getProducts = async (req, res) => {
    try {

        let connection = await pool.connect()
        let result = await storedProcedure.executeStoredProcedure(connection, 'getProducts');
        
       res.status(200).send(result.recordset)
        
    } catch (error) {
        console.log(error)
    }
}

//controller for fetching One product using product_id
exports.getOneProduct = async (req, res) => {
    try {
        const {product_id} = req.body

        if(!product_id){
            return res.status(400).send('Enter a product id to be fetched')
        }

        let sqlParameters = productSqlParameters(req.body);
        let connection = await pool.connect()
        let result = await storedProcedure.executeStoredProcedure(connection, 'getOneProduct', sqlParameters);
        
        res.status(200).send(result.recordset)
        // return result
        
    } catch (error) {
        console.log(error)
    }
}

//controller for inserting One product in products table
exports.insertProduct = async (req, res) => {
    try {
        
        let sqlParameters = productSqlParameters(req.body);
        
            let connection = await pool.connect()
            let result = await storedProcedure.executeStoredProcedure(connection, 'insertProduct', sqlParameters);
            res.status(200).send(result)
            // return result;
        
    } catch (error) {
        console.log(error)
    }
}

//controller for updating all values in products table
exports.updateProduct = async (req, res) => {
    try {
        
        const {product_id, product_name, product_price, in_stock} = req.body
        if(!((product_id && product_name && product_price && in_stock) && (in_stock.length === 0))){
            res.status(400).send('Enter all input values(product_id, product_name, product_price, in_stock)')
        }

        let sqlParameters = productSqlParameters(req.body);

        let connection = await pool.connect()
        let result = await storedProcedure.executeStoredProcedure(connection, 'updateProduct', sqlParameters);

        res.status(200).send(result)
        // return result

    } catch (error) {
        console.log(error)
    }
}

//controller for upserting One product 
exports.upsertProduct = async (req, res) => {
    try {

        const {product_id, product_name, product_price, in_stock} = req.body
        if(!(product_id && product_name && product_price && in_stock)){
            res.status(400).send('Enter all input values(product_id, product_name, product_price, in_stock)')
        }

        let sqlParameters = productSqlParameters(req.body);

        let connection = await pool.connect()
        let result = await storedProcedure.executeStoredProcedure(connection, 'upsertProduct', sqlParameters);

        res.status(200).send(result)
        // return result

    } catch (error) {
        console.log(error)
    }
}

//controller for updating specific values of a product
exports.partialUpdateProduct = async (req, res) => {
    try {

        const {product_id} = req.body 
        if(!product_id){
            res.status(400).send('Enter the product id to be updated')
        }

        let sqlParameters = productSqlParameters(req.body);

        let connection = await pool.connect()
        let result = await storedProcedure.executeStoredProcedure(connection, 'partialUpdateProduct', sqlParameters);

        res.status(200).send(result)
        // return result

    } catch (error) {
        console.log(error)
    }
}

//controller for deleting a product from the products table
exports.deleteProduct = async (req, res) => {
    try {

        const {product_id} = req.body 
        if(!product_id){
            res.status(400).send('Enter the product id to be deleted')
        }
        let sqlParameters = productSqlParameters(req.body);

        let connection = await pool.connect()
        let result = await storedProcedure.executeStoredProcedure(connection, 'deleteProduct', sqlParameters);

        res.status(200).send(result)

        // return result


    } catch (error) {
        console.log(error)
    }
}

//function to insert paramters in a proper format in the sqlparameters array
function productSqlParameters(requestBody) {

    let sqlParameters = [];
    for (let param in requestBody) {
        sqlParameters.push({ name: param, value: requestBody[param] });
    }
    return sqlParameters
}

