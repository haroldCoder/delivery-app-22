const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql")

const app = express();
app.use(express.json())
app.use(cors())

let connect = mysql.createConnection({
    host: "localhost",
    user: "koderx",
    password: "2364144",
    database: "delivery"
})
connect.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
})

app.set("port", 8000);
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

app.patch("/:id", async(req, res) =>{
    const {name, cel, xp, state} = req.body;
    const {id} = req.params;
    connect.query(`UPDATE delivery SET name = "${name}", cel = ${cel}, xp = "${xp}", state = ${state}  WHERE iddelivery = ${id}`,(err, result)=>{
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