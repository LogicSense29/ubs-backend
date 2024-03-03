const {check} = require("express-validator")
const db = require("../db");


//name 
const isFullName = check("fullName").isLength({min: 10, max:45}).withMessage("name must be with 10 to 45")

//Email
const isEmail = check("email").isEmail().withMessage("");

//phone number
const isPhoneNumber = check("phoneNumber").isLength({min: 11, max:14}).withMessage("check phone");

//check that email exist
const emailExist = check("email").custom(async(value)=>{
    const {rows} = await db.query("SELECT * FROM users WHERE email = $1", [value])
    if(rows.length){
        throw new Error;
    }
})

module.exports = {
    addUserValidation: [isFullName,isEmail,isPhoneNumber,emailExist]
}
