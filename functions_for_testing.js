const functions = {
    add: (num1, num2) => num1 + num2,
    isNull: ()=>null,
    createuser: ()=> {
        const user ={
            firstName: "Mohit",
            lastName: "Ahuja"
        }
        return user
    }
}


module.exports = functions