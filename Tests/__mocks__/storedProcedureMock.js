const storedProcedure = require('../../Stored_Procedure/storedProcedure')

const {pool} = require('../../dbConfiguration')

pool.connect = jest.fn()

storedProcedure.executeStoredProcedure = jest.fn((connection, storedProcedure, parameters) => {

    if (!connection || !parameters)
        return;

    const outputInsertProductSP = require('./outputStoredProcedure/outputInsertProductSP.json')

    switch (storedProcedure) {
        case insertProduct:
            return outputInsertProductSP;
    }
});


module.exports = storedProcedure;