const express = require("express");
require("dotenv").config();
const cors =require("cors")
const db = require("./db");
const authRoute = require("./routes/auth")
const resultRoute = require("./routes/results")

const app = express();
const PORT = `${process.env.PORT}`

db.connect();

app.use(express.json());

const corsOptions = {
    origin: 'https://ubs-personality-test.vercel.app/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization'
  };


app.use(cors(corsOptions));
// app.options('/api/users', cors({
//     origin: 'https://ubs-personality-test.vercel.app',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//   }));
  
  // Middleware for handling preflight OPTIONS request for '/api/results'
//   app.options('/api/results', cors({
//     origin: 'https://ubs-personality-test.vercel.app',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//   }));


app.get("/", (req,res) =>{
    res.json({message: "This is app is for lovers"})
})




app.use("/api/users", authRoute)
app.use("/api/results", resultRoute)
// app.post("http://umerabusinesschool.com/paystack-webhook", function(req, res) {
    // Retrieve the request's body
    // const event = req.body;
    // Do something with event
    // res.send(200);
// });




app.listen(PORT,()=> {
    console.log(`APP IS LISTENING ON PORT ${PORT}`)
})