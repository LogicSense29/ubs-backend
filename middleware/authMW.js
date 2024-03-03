const {validationResult} = require("express-validator");

const vMW = (req,res,next)=> {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json(
            {
                message: "Error with Validation",
                errors: error.array()
            }
        )
    }
    next();
}

module.exports = vMW;