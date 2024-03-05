const express = require("express");
require("dotenv").config();
const cors =require("cors")
const db = require("./db");
const authRoute = require("./routes/auth")
const resultRoute = require("./routes/results")

const app = express();
const PORT = `${process.env.PORT}`

const corsOptions = {
    origin: "https://ubs-personality-test.vercel.app",
  };


app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://ubs-personality-test.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  
db.connect();



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