const functions = require('../functions_for_testing')

test('Tests sum of 1 + 3 :', ()=>{
    expect(functions.add(1,3)).toBe(4)
})

test('Tests of isNull', ()=>{
    expect(functions.isNull()).toBeNull()
})

test('Tests of User object', ()=>{
    expect(functions.createuser()).toEqual({
        firstName: "Mohit",
        lastName: "Ahuja"
    })
})


test('Tests value should be less than 100', ()=>{
    const num1 = 60
    const num2 = 30
    expect(num1 + num2).toBeLessThan(100)
})

test('Tests Admin should be present in the Array', ()=>{
    const roles = ['admin', 'student', 'teacher']
    expect(roles).toContain('admin')
})


let animals = [	'elephant',	'zebra', 'bear', 'tiger',];

beforeEach(() => {
animals = ['elephant', 'zebra', 'bear', 'tiger',];
});

describe('animals array', () => {
	test('add animal to end of array', () => {
		animals.push('bird');
		expect(animals[animals.length - 1]).toBe('bird');
	});

	test('add animal to beginning of array', () => {
		animals.unshift('monkey');
		expect(animals[0]).toBe('monkey');
	});

	test('have initial length of 4', () => {
		expect(animals.length).toBe(4);
	});
});




