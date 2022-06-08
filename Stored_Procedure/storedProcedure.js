// Assigning parameters in the request object & executing the stored procedure
const res = require('express/lib/response');
const sql = require('mssql')

async function executeStoredProcedure(connection, storedProcedureName, parameters){
    try {
        let request = await connection.request()

        if(parameters){
            parameters.forEach(param => {
                   request.input(param.name, param.value)
                
            });
        }
        
        let result = await request.execute(`dbo.${storedProcedureName}`)
        sql.close()
        return result
        
    } catch (error) {
        throw error
    }
}

module.exports = {
     executeStoredProcedure
}