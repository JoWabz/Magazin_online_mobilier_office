

const express = require("express");
const fs= require('fs');
const path=require('path');

app= express();
console.log("Folder proiect", __dirname);
console.log("Cale fisier", __filename);
console.log("Director de lucru", process.cwd());
 
app.set("view engine","ejs");

app.use("/resurse", express.static(__dirname+"/resurse"));

app.get("/", function (req, res){
    // res.sendFile(path.join(__dirname, "index.html"))
    res.render("pagini/index")
})

// app.get("/", function(req, res){
    // res.sendFile(path.join(__dirname,"index.html"));
    // res.render("pagini/index");
// })

// app.get("/pagina", function(req, res){
//     res.send("<b style='color:red'>alceva </b> ziua!");
// })


// app.get("/vector/:a", function(req, res){
//     let vec = [1,10,100,1000];
//     res.write(vec[req.params.a]+" ");
//     res.write(vec[req.params.a]*2+" ");
//     res.end();
// })

// app.get("/*", function(req, res){
//     res.send("Nu stiu")
// })

app.get("/test", function(req, res){
    res.render("pagini/test")
})

app.get("/suma/:a/:b", function (req, res){
    res.write(parseInt(req.params.a)+parseInt(req.params.b)+ "");
    res.end()
})

app.listen(8080);
console.log("Serverul a pornit");
