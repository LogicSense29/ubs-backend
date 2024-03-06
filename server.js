const express = require("express");
require("dotenv").config();
const cors =require("cors")
const db = require("./db");
const authRoute = require("./routes/auth")
const resultRoute = require("./routes/results")
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = `${process.env.PORT}`

const corsOptions = {
    origin: 'https://ubs-personality-test.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // credentials: true,
  };

// Create a proxy middleware that forwards requests to the API server
const apiProxy = createProxyMiddleware('/api', {
    target: 'https://ubs-pt.cyclic.app',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '/api', // Optional: Rewrite the path if needed
    },
  });
  
  app.use(apiProxy);
  


app.use(cors(corsOptions));
app.use(express.json());

  
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