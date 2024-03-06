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

app.options('/api/users', (req, res) => {
    // Set CORS headers manually
    res.header('Access-Control-Allow-Origin', 'https://ubs-personality-test.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, HEAD, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    // Respond to the preflight request
    res.status(204).end();
  });

app.options('/api/results', (req, res) => {
    // Set CORS headers manually
    res.header('Access-Control-Allow-Origin', 'https://ubs-personality-test.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, HEAD, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    // Respond to the preflight request
    res.status(204).end();
  });

// const corsOptions = {
//     origin: 'https://ubs-personality-test.vercel.app',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     allowedHeaders: 'Content-Type,Authorization'
//   };


// app.use(cors(corsOptions));
// app.options('/api/users', cors({
//     origin: 'https://ubs-personality-test.vercel.app',
//     methods: 'GET,OPTIONS,HEAD,PUT,PATCH,POST,DELETE',
//     allowedHeaders: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
//     credentials: true,
//   }));
  
  // Middleware for handling preflight OPTIONS request for '/api/results'
//   app.options('/api/results', cors({
//     origin: 'https://ubs-personality-test.vercel.app',
//     methods: 'GET,OPTIONS,HEAD,PUT,PATCH,POST,DELETE',
//     allowedHeaders: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
//     credentials: true,
//   }));


// app.get("/", (req,res) =>{
//     res.json({message: "This is app is for lovers"})
// })




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