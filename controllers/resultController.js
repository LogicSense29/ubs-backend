const db = require("../db");
const { sendEmail } = require("../utils/sendEmail");


const getResults= async(req,res)=>{
    const {user_id} = req.user;
    try {
            const {rows} = await db.query("SELECT result FROM results WHERE id = $1", [user_id])
            if(!rows[0]){
                return res.status(404).json({ message: "Result not found" });
             }
             else {
                 return  res.status(200).json(rows[0].result);
             }
    }catch(err){
        console.error("Database error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const addResults= async(req,res)=>{
    const {round, email} = req.body
    const  {id} = req.params;
    try {
        const {rows} = await db.query("INSERT INTO results(id,result) VALUES($1,$2) RETURNING result", [id,round]);
        const result = rows[0].result
        res.status(200).json(result)
        sendEmail(email, result)
    }catch(err){
        console.error("Database error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    getResults,
    addResults
}