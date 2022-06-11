const insertProductInput = require('../Validation/Input/insertProductInput.json')
const getOneProductInput = require('../Validation/Input/insertProductInput.json')


test("Validate validateAllParameters", () => {

    expect(() => validateAllParameters(insertProductInput))
    .toThrow('Enter all input values(product_id, product_name, product_price, in_stock)');
})

test("Validate validateOneParamter", () => {

    expect(() => validateAllParameters(getOneProductInput))
    .toThrow('Enter a valid product_id');
})


