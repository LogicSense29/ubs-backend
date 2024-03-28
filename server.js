const express = require("express");
require("dotenv").config();
const cors =require("cors")
const db = require("./db");
const authRoute = require("./routes/auth")
const resultRoute = require("./routes/results")

const app = express();
const PORT = `${process.env.PORT}`

db.connect();

const listOfOrigin = ['https://ubs-personality-test.vercel.app', 'http://localhost:5173']
const corsOptions = {
    origin: listOfOrigin,
    methods: ['GET','HEAD','OPTIONS','PATCH','POST','DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type,Authorization,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version,'],
    optionsSuccessStatus: 200
  };


app.use(cors(corsOptions));

app.use(express.json());

app.options('/api/users', cors({
    origin: 'https://ubs-personality-test.vercel.app',
    methods: 'GET,OPTIONS,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
    credentials: true,
  }));
  
  // Middleware for handling preflight OPTIONS request for '/api/results'
//   app.options('/api/results', cors({
//     origin: 'https://ubs-personality-test.vercel.app',
//     methods: 'GET,OPTIONS,HEAD,PUT,PATCH,POST,DELETE',
//     allowedHeaders: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
//     credentials: true,
//   }));



app.use("/api/users", authRoute)
app.use("/api/results", resultRoute)
app.options('/api/results', cors(corsOptions));
// app.post("http://umerabusinesschool.com/paystack-webhook", function(req, res) {
    // Retrieve the request's body
    // const event = req.body;
    // Do something with event
    // res.send(200);
// });




app.listen(PORT,()=> {
    console.log(`APP IS LISTENING ON PORT ${PORT}`)
})