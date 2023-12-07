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

app.use(bodyParser.urlencoded({ extended: true }));


const dbConfig = {
  host: "localhost",
  user: "root",
  password: "pass",
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


app.get("/links", (req, res) => {
  const talent = req.body.talent
  const q = `SELECT * FROM ${talent}_links`
})

module.exports = app;