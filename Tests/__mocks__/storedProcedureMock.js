const storedProcedure = require('../../Stored_Procedure/storedProcedure')
 

storedProcedure.executeStoredProcedure = jest.fn((connection, storedProcedure, parameters) => {

    if (!connection || !parameters)
        return;

    const outputInsertProductSP = require('./outputStoredProcedure/outputInsertProductSP.json')
    const outputgetOneProductSP = require('./outputStoredProcedure/outputgetOneProductSP.json')

    switch (storedProcedure) {
        case 'insertProduct':
            return outputInsertProductSP;
        case 'getOneProduct':
            return outputgetOneProductSP;
    }
});


module.exports = storedProcedure;