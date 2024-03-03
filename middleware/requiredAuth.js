const jwt = require("jsonwebtoken");
const db = require("../db");
require("dotenv").config();

async function requireAuth(req,res,next){
    const {authorization} = req.headers;

    //check if it has a value
    if(!authorization){
        return res.status(401).json({error: "Invalid Authorization"});
    }

    //check if the token is verified
    const token = authorization.split(" ")[1];
        try{
            const {id} = jwt.verify(token, process.env.SECRET);

            const item = await db.query("SELECT user_id FROM users WHERE user_id = $1", [id]);
            req.user = item.rows[0]
            next();
        }catch(err){
            console.log(err)
            return res.status(401).json({error: "Unverified token"});
    }

}


module.exports = requireAuth;