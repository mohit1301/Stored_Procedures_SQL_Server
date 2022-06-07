const storedProcedure = require('../Stored_Procedure/storedProcedure')
const { pool } = require('../dbConfiguration')

//controller for fetching all products from products table
exports.getProducts = async (req, res) => {
    try {

        let connection = await pool.connect()
        let result = await storedProcedure.executeStoredProcedure(connection, 'getProducts');
        
        // return result.recordset
        res.send(result.recordset)
        
    } catch (error) {
        console.log(error)
    }
}

//controller for fetching One product using product_id
exports.getOneProduct = async (req, res) => {
    try {

        let sqlParameters = productSqlParameters(req.body);
        let connection = await pool.connect()
        let result = await storedProcedure.executeStoredProcedure(connection, 'getOneProduct', sqlParameters);
        
        res.send(result.recordset)
        // return result.recordset
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
        
        return result;

    } catch (error) {
        console.log(error)
    }
}

//controller for updating all values in products table
exports.updateProduct = async (req, res) => {
    try {
        let sqlParameters = productSqlParameters(req.body);

        let connection = await pool.connect()
        let result = await storedProcedure.executeStoredProcedure(connection, 'updateProduct', sqlParameters);

        // outputResponse = {
        //     status: 200,
        //     data: result.rowsAffected
        // }
        // res.send(outputResponse)
        return result

    } catch (error) {
        console.log(error)
    }
}

//controller for upserting One product 
exports.upsertProduct = async (req, res) => {
    try {
        let sqlParameters = productSqlParameters(req.body);

        let connection = await pool.connect()
        let result = await storedProcedure.executeStoredProcedure(connection, 'upsertProduct', sqlParameters);

        outputResponse = {
            status: 200,
            data: result.rowsAffected
        }
        res.send(outputResponse)

    } catch (error) {
        console.log(error)
    }
}

//controller for updating specific values of a product
exports.partialUpdateProduct = async (req, res) => {
    try {
        let sqlParameters = productSqlParameters(req.body);

        let connection = await pool.connect()
        let result = await storedProcedure.executeStoredProcedure(connection, 'partialUpdateProduct', sqlParameters);

        outputResponse = {
            status: 200,
            data: result.rowsAffected
        }
        res.send(outputResponse)

    } catch (error) {
        console.log(error)
    }
}

//controller for deleting a product from the products table
exports.deleteProduct = async (req, res) => {
    try {
        let sqlParameters = productSqlParameters(req.body);

        let connection = await pool.connect()
        let result = await storedProcedure.executeStoredProcedure(connection, 'deleteProduct', sqlParameters);

        // outputResponse = {
        //     status: 200,
        //     data: result.rowsAffected
        // }
        // res.send(outputResponse)
        return result


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

exports.productSqlParameters;
