const express = require('express')

const app = express()
const router = express.Router()
const cors = require('cors');
const bodyParser = require('body-parser')
const mysql = require('mysql2')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    res.header("Access-Control-Allow-Credentials", true)
    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }
    next();
  });
  
app.use(cors());
app.use(express.json());
  
//   app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
module.exports = app;