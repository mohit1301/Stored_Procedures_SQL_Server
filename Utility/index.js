//function to insert paramters in a proper format in the sqlparameters array
function productSqlParameters(requestBody) {

    let sqlParameters = [];
    for (let param in requestBody) {
        sqlParameters.push({ name: param, value: requestBody[param] });
    }
    return sqlParameters
}

//function to check if all columns are present in the request body or not
// function validateAllParameters(requestBody){
//     let values = ['product_id', 'product_name', 'product_price', 'in_stock']
//     let result =''

//     for(let element = 0; element < values.length ; element++){

//         if(requestBody[values[element]] == undefined || requestBody[values[element]].length == 0 )
//         {
//          result = "All input fields not present"
//          break;
//         }   
//         else{
//             result = "All fields present"
//         } 
//     };
//     return result
// }





//function to check if all columns are present in the request body or not
function validateAllParameters(requestBody){
    let values = ['product_id', 'product_name', 'product_price', 'in_stock']

    for(let element = 0; element < values.length ; element++){

        if(requestBody[values[element]] == undefined || requestBody[values[element]].length == 0 )
        {
         throw new Error("Enter all input values(product_id, product_name, product_price, in_stock)")
        }   
    };
 
}


//function to check if product_id is present in request body or not
function validateOneParamter(requestBody){
 
    if(requestBody.product_id == undefined || requestBody.product_id.length == 0){
        throw new Error("Enter a valid product_id")
    }
}

//function to convert request body keys in lowercase
function convertObjectKeysToLowerCase(obj) {

    if (!isValidObject(obj))
        return obj;

    let key, keys = Object.keys(obj);
    let keyCount = keys.length;
    let newObj = {};
    while (keyCount--) {
        key = keys[keyCount];
        if (isValidObject(obj[key])) {
            newObj[key.toLowerCase()] = convertObjectKeysToLowerCase(obj[key]);
        }
        else {
            newObj[key.toLowerCase()] = obj[key];
        }
    }

    return newObj;
}

/* Check whether value is valid object ({}) or not if not a valid object then return false */
function isValidObject(value) {
    return (value != null && typeof (value) == 'object') ? true : false;
}

module.exports = {
    validateAllParameters,
    validateOneParamter,
    productSqlParameters,
    convertObjectKeysToLowerCase
}