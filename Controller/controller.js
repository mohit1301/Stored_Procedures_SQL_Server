const storedProcedure = require('../Stored_Procedure/storedProcedure')
const { pool } = require('../dbConfiguration')

//controller for fetching all products from products table
exports.getProducts = async (req, res) => {
    try {

        let connection = await pool.connect()
        let result = await storedProcedure.executeStoredProcedure(connection, 'getProducts');
        
       res.status(200).json({data: result.recordset})
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//controller for fetching One product using product_id
exports.getOneProduct = async (req, res) => {
    try {
        const validationResult = validateOneParamter(req.body)
        
        if(validationResult == "input field not present")
         return res.status(400).json({error: 'Enter the product id to be fetched'})
        else{

        let sqlParameters = productSqlParameters(req.body);
        let connection = await pool.connect()
        let result = await storedProcedure.executeStoredProcedure(connection, 'getOneProduct', sqlParameters);
        
        res.status(200).json({data: result.recordset})
        }
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//controller for inserting One product in products table
exports.insertProduct = async (req, res) => {
    try {
        const validationResult = validateRequestBody(req.body)
        if(validationResult == "All input fields not present"){

         return res.status(400).json({error: 'Enter all input values(product_id, product_name, product_price, in_stock)'});
        }
        else{
            let sqlParameters = productSqlParameters(req.body);
            
            let connection = await pool.connect()
            let result = await storedProcedure.executeStoredProcedure(connection, 'insertProduct', sqlParameters)

            if(result.rowsAffected == 1){
                res.status(200).json({message: "Product inserted successfully"})
            }
        }
    
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}

//controller for updating all values in products table
exports.updateProduct = async (req, res) => {
    try {
        const validationResult = validateRequestBody(req.body)
        if(validationResult == "All input fields not present"){
         return res.status(400).json({error: 'Enter all input values(product_id, product_name, product_price, in_stock)'});
        }

        else{

            let sqlParameters = productSqlParameters(req.body);
    
            let connection = await pool.connect()
            let result = await storedProcedure.executeStoredProcedure(connection, 'updateProduct', sqlParameters);
    
            if(result.rowsAffected == 1){
                res.status(200).json({message: "Product updated successfully"})
            }
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//controller for upserting One product 
exports.upsertProduct = async (req, res) => {
    try {
        const validationResult = validateRequestBody(req.body)
        if(validationResult == "All input fields not present"){

         return res.status(400).json({error: 'Enter all input values(product_id, product_name, product_price, in_stock)'});
        }
        else{

            let sqlParameters = productSqlParameters(req.body);
    
            let connection = await pool.connect()
            let result = await storedProcedure.executeStoredProcedure(connection, 'upsertProduct', sqlParameters);
    
            if(result.rowsAffected == 1){
                res.status(200).json({message: "Product upserted successfully"})
            }
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//controller for updating specific values of a product
exports.partialUpdateProduct = async (req, res) => {
    try {

        const validationResult = validateOneParamter(req.body)
        
        if(validationResult == "input field not present")
         return res.status(400).json({error: 'Enter the product id to be updated'})
        else{
        let sqlParameters = productSqlParameters(req.body);

        let connection = await pool.connect()
        let result = await storedProcedure.executeStoredProcedure(connection, 'partialUpdateProduct', sqlParameters);

        if(result.rowsAffected == 1){
            res.status(200).json({message: "Product Updated successfully"})
        }
    }

    } catch (error) {
        res.status(400).json({error: error.message})

    }
}

//controller for deleting a product from the products table
exports.deleteProduct = async (req, res) => {
    try {
        const validationResult = validateOneParamter(req.body)
        
        if(validationResult == "input field not present")
         return res.status(400).send('Enter the product id to be deleted')
        else{
            let sqlParameters = productSqlParameters(req.body);
    
            let connection = await pool.connect()
            let result = await storedProcedure.executeStoredProcedure(connection, 'deleteProduct', sqlParameters);
            if(result.rowsAffected == 1){
                res.status(200).json({message: "Product deleted successfully"})
            }
        }

    } catch (error) {
        res.status(400).json({error: error.message})
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


function validateRequestBody(requestBody){
    let values = ['product_id', 'product_name', 'product_price', 'in_stock']
    let result =''

    for(let element = 0; element < values.length ; element++){

        if(requestBody[values[element]] == undefined || requestBody[values[element]].length == 0 )
        {
         result = "All input fields not present"
         break;
        }   
        else{
            result = "All fields present"
        } 
    };
    return result
}

function validateOneParamter(requestBody){
 
    if(requestBody.product_id == undefined || requestBody.product_id.length == 0){
        return "input field not present"
    }
}
