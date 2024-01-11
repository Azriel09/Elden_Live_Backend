const express = require('express')
const app = express()
const router = express.Router()
const cors = require('cors');
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const async = require("async")
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

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



const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
}
const db = mysql.createConnection(dbConfig)

db.connect((err) => {
  if(err) {
      console.log("Error connecting to MySQL", err)
      return
  }
  console.log("Connected to MySQL")
})

app.get("/test", (req, res) => {
  const q = "SELECT * FROM ame_links"
  db.query(q,function(err, results){
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
      
    }
    return res.json(results)
  })
})


app.get("/get_links", function (req, res) {


  if(process.env.CLIENT_API !== req.headers.apikey) {
    return
  }
  // Define the queries to run
  var query1 = "SELECT * FROM ame_links";
  var query2 = "SELECT * FROM calli_links"
  var query3 = "SELECT * FROM gura_links";
  var query4 = "SELECT * FROM ina_links"
  var query5 = "SELECT * FROM irys_links"
  var query6 = "SELECT * FROM kronii_links"
 


  async.parallel(
    [
      function (callback) {
   
        db.query(query1, function (err, result) {
          if (err) return callback(err);
          callback(null, result);
        });
      },
      function (callback) {
  
        db.query(query2, function (err, result) {
          if (err) return callback(err);
          callback(null, result);
        });
      },      function (callback) {
   
        db.query(query3, function (err, result) {
          if (err) return callback(err);
          callback(null, result);
        });
      },
      function (callback) {
   
        db.query(query4, function (err, result) {
          if (err) return callback(err);
          callback(null, result);
        });
      },      function (callback) {
   
        db.query(query5, function (err, result) {
          if (err) return callback(err);
          callback(null, result);
        });
      },      function (callback) {
   
        db.query(query6, function (err, result) {
          if (err) return callback(err);
          callback(null, result);
        });
      },
    
    ],
    function (err, results) {
      // This function is called after all queries are done
      if (err) {
        // If there is an error, send a 500 res
        res.status(500).json({ error: err.message });
      } else {
        // If there is no error, send a 200 res with the results
        res.status(200).json({
          "Amelia Watson": results[0],
          "Mori Calliope": results[1],
          "Gawr Gura": results[2],
          "Ninomae Ina'nis": results[3],
          "IRyS": results[4],
          "Ouro Kronii": results[5],
          
  
        });
      }
    }
  );
});

app.get("/get_deaths", function (req, res) {
  
  if(process.env.CLIENT_API !== req.headers.apikey) {
    return
  }
  var query1 = "SELECT * FROM ame_deaths"
  var query2 = "SELECT * FROM calli_deaths"
  var query3 = "SELECT * FROM gura_deaths"
  var query4 = "SELECT * FROM ina_deaths"
  var query5 = "SELECT * FROM irys_deaths"
  var query6 = "SELECT * FROM kronii_deaths"
  async.parallel(
    [
      function (callback) {
   
        db.query(query1, function (err, result) {
          if (err) return callback(err);
          callback(null, result);
        });
      },
      function (callback) {
  
        db.query(query2, function (err, result) {
          if (err) return callback(err);
          callback(null, result);
        });
      },      function (callback) {
   
        db.query(query3, function (err, result) {
          if (err) return callback(err);
          callback(null, result);
        });
      },
      function (callback) {
   
        db.query(query4, function (err, result) {
          if (err) return callback(err);
          callback(null, result);
        });
      },      function (callback) {
   
        db.query(query5, function (err, result) {
          if (err) return callback(err);
          callback(null, result);
        });
      },      function (callback) {
   
        db.query(query6, function (err, result) {
          if (err) return callback(err);
          callback(null, result);
        });
      },
    
    ],
    function (err, results) {
      // This function is called after all queries are done
      if (err) {
        // If there is an error, send a 500 res
        res.status(500).json({ error: err.message });
      } else {
        // If there is no error, send a 200 res with the results
        res.status(200).json({
          "Amelia Watson": results[0],
          "Mori Calliope": results[1],
          "Gawr Gura": results[2],
          "Ninomae Ina'nis": results[3],
          "IRyS": results[4],
          "Ouro Kronii": results[5],
          
  
        });
      }
    }
  );
})



module.exports = app;