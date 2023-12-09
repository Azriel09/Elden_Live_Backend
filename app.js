const express = require('express')

const app = express()
const router = express.Router()
const cors = require('cors');
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const async = require("async")
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

app.use(bodyParser.urlencoded({ extended: true }));


const dbConfig = {
  host: "localhost",
  user: "root",
  password: "My092948",
  database: "elden_live",
  port: 3306
}
const db = mysql.createConnection(dbConfig)

db.connect((err) => {
  if(err) {
      console.log("Error connecting to MySQL RDS:", err)
      return
  }
  console.log("Connected to MySQL RDS")
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
  // Define the queries to run
  var query1 = "SELECT * FROM ame_links";
  var query2 = "SELECT * FROM gura_links";



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
      },
    
    ],
    function (err, results) {
      // This function is called after all queries are done
      if (err) {
        // If there is an error, send a 500 response
        res.status(500).json({ error: err.message });
      } else {
        // If there is no error, send a 200 response with the results
        res.status(200).json({
          "Amelia Watson": results[0],
          "Gawr Gura": results[1],
  
        });
      }
    }
  );
});



app.get("/links", (req, res) => {
  const talent = req.body.talent
  const q = `SELECT * FROM ${talent}_links`
})

module.exports = app;