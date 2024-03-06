const express = require("express");
require("dotenv").config();
const cors =require("cors")
const db = require("./db");
const authRoute = require("./routes/auth")
const resultRoute = require("./routes/results")

const app = express();
const PORT = `${process.env.PORT}`

// const corsOptions = {
//     origin: 'https://ubs-personality-test.vercel.app',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // credentials: true,
//   };


  


// app.use(cors(corsOptions));
app.options('/api/users', cors()) 
app.options('/api/results', cors())
app.use(express.json());

app.get("/", (req,res) =>{
    res.json({message: "This is an App for lovers"})
})

  
db.connect();



app.use("/api/users",cors(), authRoute)
app.use("/api/results",cors(), resultRoute)
// app.post("http://umerabusinesschool.com/paystack-webhook", function(req, res) {
    // Retrieve the request's body
    // const event = req.body;
    // Do something with event
    // res.send(200);
// });




app.listen(PORT,()=> {
    console.log(`APP IS LISTENING ON PORT ${PORT}`)
})