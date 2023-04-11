const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2")
const {
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_USER,
    DB_PORT
} = require('./config.js');
const { PORT } = require("./config.js");
const app = express();
app.use(express.json())
app.use(cors())

let connect = mysql.createConnection({
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME
})
connect.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
})

app.set("port", PORT);
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
    if (req.method == "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});
app.get("/", async(req, res)=>{
    connect.query("SELECT * FROM delivery",(err, result)=>{
        if(err) throw err;
        res.json(result)
    });
    
})

app.post("/", (req, res)=>{
    const {name, cel, xp, state} = req.body;

    connect.query(`INSERT INTO delivery(name,cel,xp,state) VALUES ("${name}", ${cel}, "${xp}", ${state})`,(err, result)=>{
        if(err) throw err
        console.log("delivery create");
    })
})

app.put("/:id", async(req, res) =>{
    const {name, cel, xp, state} = req.body;
    const {id} = req.params;
    connect.query(`UPDATE delivery SET name = "${name}", cel = ${cel}, xp = "${xp}", state = ${state}  WHERE id = ${id}`,(err, result)=>{
        if(err) throw err;
        res.json(result)
    })
})

app.delete("/:id", (req, res)=>{
    const {id} = req.params;
    connect.query(`DELETE FROM delivery WHERE id = $1`,[id])
})


app.listen(app.get("port"), (req, res)=>{
    console.log(`server on port ${app.get("port")}`);
})