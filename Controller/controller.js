const { validateAllParameters, validateOneParamter, convertObjectKeysToLowerCase} = require('../Utility/index')
const { insertService, getOneService, getAllService,
updateService, upsertService, partialUpdateService, deleteService } = require("../Services");

//controller for fetching all products from products table
exports.getProducts = async (req, res) => {
    try {

        let result = await getAllService()
        res.status(200).json({data: result.recordset})
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//controller for fetching One product using product_id
exports.getOneProduct = async (req, res) => {
    try {
        
        let requestBody = convertObjectKeysToLowerCase(req.body)
        validateOneParamter(requestBody)
        let result = await getOneService(req.body)  
        res.status(200).json({data: result.recordset})
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//controller for inserting One product in products table
// exports.insertProduct = async (req, res) => {
//     try {
//         requestBody = convertObjectKeysToLowerCase(req.body)
//         const validationResult = validateAllParameters(requestBody)
//         if(validationResult == "All input fields not present"){

//          return res.status(400).json({error: 'Enter all input values(product_id, product_name, product_price, in_stock)'});
//         }
//         else{
//             let sqlParameters = productSqlParameters(req.body);
            
//             let connection = await pool.connect()
//             let result = await storedProcedure.executeStoredProcedure(connection, 'insertProduct', sqlParameters)
            
//             if(result.rowsAffected == 1){
//                 res.status(200).json({message: "Product inserted successfully"})
//             }
//         }
    
//     } catch (error) {
//         res.status(400).json({error: error.message})
//     }
// }


exports.insertProduct = async (req, res) => {
    try {
        
        let requestBody = convertObjectKeysToLowerCase(req.body)
        validateAllParameters(requestBody)
        let message = await insertService(req.body)
        res.status(200).json({"message": message})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


//controller for updating all values in products table
exports.updateProduct = async (req, res) => {
    try {
        
        let requestBody = convertObjectKeysToLowerCase(req.body)
        validateAllParameters(requestBody)
        let message = await updateService(req.body)
        res.status(200).json({"message": message})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//controller for upserting One product 
exports.upsertProduct = async (req, res) => {
    try {
        
        let requestBody = convertObjectKeysToLowerCase(req.body)
        validateAllParameters(requestBody)
        let message = await upsertService(req.body)
        res.status(200).json({"message": message})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//controller for updating specific values of a product
exports.partialUpdateProduct = async (req, res) => {
    try {
        
        let requestBody = convertObjectKeysToLowerCase(req.body)
        validateOneParamter(requestBody)
        let message = await partialUpdateService(req.body)
        res.status(200).json({"message": message})

    } catch (error) {
        res.status(400).json({error: error.message})

    }
}

//controller for deleting a product from the products table
exports.deleteProduct = async (req, res) => {
    try {
        
        let requestBody = convertObjectKeysToLowerCase(req.body)
        validateOneParamter(requestBody)
        let message = await deleteService(req.body)
        res.status(200).json({"message": message})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


