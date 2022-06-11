// Assigning parameters in the request object & executing the stored procedure

async function executeStoredProcedure(connection, storedProcedureName, parameters){
    try {
        let request = await connection.request()
        
        if(parameters){
            parameters.forEach(param => {
                   request.input(param.name, param.value)
                
            });
        }
        
        return await request.execute(`dbo.${storedProcedureName}`)

    } catch (error) {
        throw error
    }
}

module.exports = {
     executeStoredProcedure
}