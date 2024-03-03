const db = require("../db");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const crypto = require("crypto");
const { welcomeEmail } = require("../utils/welcomeEmail");


//Token function
function createToken(id){
    return jwt.sign({id}, process.env.SECRET, {expiresIn: "3d"})
}

const getUsers = async (req,res)=>{
        const {email} = req.body
        //validation
        if(!email){
            return res.status(401).json({message:"email field must be filled"});
        }  


        try{
            const {rows} = await db.query("SELECT * FROM users WHERE email = $1", [email]);
            if(!rows[0]) {
                return res.status(404).json({ message: "Email not found" });
             } 
                const id = rows[0].user_id;
                const token = createToken(id)

                console.log(id)
                return res.status(200).json({id,email,token})
             
        } catch(err){
            console.error("Database error:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
}

//Register

const addUsers = async(req,res) => {
    const {fullName,email,phoneNumber} = req.body;

    //validation
    if(!email || !phoneNumber){
        return res.status(401).json({message: "all fields must be filled"});
    }

    if(!validator.isEmail(email)){
        return res.status(401).json({message: "Email is not valid"});  
    }

    try{
        const response = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        
        if(response.rows[0]) {
           return res.status(401).json({message: "user already exist"})
        }

    try{
       const {rows} = await db.query("INSERT INTO users(full_name, email, phone_number) VALUES($1,$2,$3) RETURNING user_id", [fullName,email,phoneNumber]);
       const id = rows[0].user_id;
       const token = createToken(id)
       welcomeEmail(email,fullName);
       return res.status(200).json({id,email,token})
    }catch(error) {
        console.error("Database error:", error);
        return res.status(400).json({message: "e no dey go o"})
    }
}catch(error) {
    console.error("Database error:", error);
    return res.status(500).json({message: "e no go"})
}
}

module.exports = {
    getUsers,
    addUsers
}

