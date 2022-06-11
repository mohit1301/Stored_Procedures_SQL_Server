const storedProcedure = require('../../Stored_Procedure/storedProcedure')
 

storedProcedure.executeStoredProcedure = jest.fn((connection, storedProcedure, parameters) => {

    if (!connection)
        return;

    const outputInsertProductSP = require('./outputStoredProcedure/outputInsertProductSP.json')
    const outputgetOneProductSP = require('./outputStoredProcedure/outputgetOneProductSP.json')
    const outputgetProductsSP = require('./outputStoredProcedure/outputgetProductsSP.json')
    const outputUpdateProductSP = require('./outputStoredProcedure/outputUpdateProductSP.json')
    const outputPartialUpdateProductSP = require('./outputStoredProcedure/outputPartialUpdateProductSP.json')
    const outputUpsertProductSP = require('./outputStoredProcedure/outputUpsertProductSP.json')
    const outputDeleteProductSP = require('./outputStoredProcedure/outputDeleteProductSP.json')

    switch (storedProcedure) {
        case 'insertProduct':
            return outputInsertProductSP;
        case 'getOneProduct':
            return outputgetOneProductSP;
        case 'getProducts':
            return outputgetProductsSP;
        case 'updateProduct':
            return outputUpdateProductSP;
        case 'partialUpdateProduct':
            return outputPartialUpdateProductSP;
        case 'upsertProduct':
            return outputUpsertProductSP;
        case 'deleteProduct':
            return outputDeleteProductSP;
    }
});


module.exports = storedProcedure;