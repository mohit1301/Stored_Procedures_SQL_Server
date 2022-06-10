const { pool } = require('./dbConfiguration')
const storedProcedure = require('./Stored_Procedure/storedProcedure')
const {productSqlParameters} = require('./Utility/index')

exports.getOneService = async(requestBody)=>{
    let sqlParameters = productSqlParameters(requestBody);
        
    const connection =  await pool.connect()
    let result = await storedProcedure.executeStoredProcedure(connection, 'getOneProduct', sqlParameters)
    await connection.close()

    return result
}

exports.getAllService = async()=>{
   
    const connection = await pool.connect()
    let result = await storedProcedure.executeStoredProcedure(connection, 'getProducts')
    await connection.close()
    return result
}

exports.insertService = async(requestBody)=>{
    let sqlParameters = productSqlParameters(requestBody);
        
    const connection = await pool.connect()
    let result = await storedProcedure.executeStoredProcedure(connection, 'insertProduct', sqlParameters)

    if(result.rowsAffected == 1){
        return "Product inserted successfully"
    }   
    await connection.close()

}

exports.updateService = async(requestBody)=>{
    let sqlParameters = productSqlParameters(requestBody);
        
    const connection = await pool.connect()
    let result = await storedProcedure.executeStoredProcedure(connection, 'updateProduct', sqlParameters)

    if(result.rowsAffected == 1){
        return "Product updated successfully"
    }   
    await connection.close()

}

exports.partialUpdateService = async(requestBody)=>{
    let sqlParameters = productSqlParameters(requestBody);
        
    const connection = await pool.connect()
    let result = await storedProcedure.executeStoredProcedure(connection, 'partialUpdateProduct', sqlParameters)

    if(result.rowsAffected == 1){
        return "Product updated successfully"
    }   
    await connection.close()

}

exports.upsertService = async(requestBody)=>{
    let sqlParameters = productSqlParameters(requestBody);
        
    const connection = await pool.connect()
    let result = await storedProcedure.executeStoredProcedure(connection, 'upsertProduct', sqlParameters)

    if(result.rowsAffected == 1){
        return "Product upserted successfully"
    }   
    await connection.close()

}

exports.deleteService = async(requestBody)=>{
    let sqlParameters = productSqlParameters(requestBody);
        
    const connection = await pool.connect()
    let result = await storedProcedure.executeStoredProcedure(connection, 'deleteProduct', sqlParameters)

    if(result.rowsAffected == 1){
        return "Product deleted successfully"
    }   
    await connection.close()

}




