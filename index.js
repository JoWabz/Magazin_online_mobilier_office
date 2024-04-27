
// const express = require("express");
// const fs= require('fs');

// const path=require('path');
// // const sharp=require('sharp');
// // const sass=require('sass');
// // const ejs=require('ejs');
 
 
// app= express();
// console.log("Folder proiect", __dirname);
// console.log("Cale fisier", __filename);
// console.log("Director de lucru", process.cwd());
 
// app.set("view engine","ejs");
 
// obGlobal ={
//     obErori: null
// }

// vect_foldere=["temp", "backup"]
// for (let folder of vect_foldere){
//     let caleFolder=path.join(__dirname, folder);
//     if (!fs.existsSync(caleFolder)){
//         fs.mkdirSync(caleFolder)
//     }
// }

// app.use("/resurse", express.static(__dirname+"/resurse"));

// // app.get("/test",function (req, res){
// //     //res.sendFile(path.join(__dirname,"index.html"))
// //     res.render("pagini/test");

// // })

// app.get("/a/b/c",function (req, res){
//     res.render("pagini/index");

// })

// app.get(["/", "/home", "/index"], function (req, res){
//     //res.sendFile(path.join(__dirname,"index.html"))
//     res.render("pagini/index",{ ip: req.ip});

// })

// // app.get("/pagina", function (req, res, next){
// //     res.write("Altceva 1 ");
// //     res.write(" <p>.....</p>");
// //     console.log(1)
// //     next()
// // })



// // app.get("/pagina", function (req, res){
// //     res.write("Altceva 2");
// //     res.end()
// //     console.log(2)
// // })

// app.get("/favicon.ico",function (req, res){
//     res.sendFile(path.join(__dirname,"resurse/imagini/favicon.ico"))
// } )


// app.get("/suma/:a/:b", function (req, res){
//     res.write((parseInt(req.params.a)+parseInt(req.params.b))+"");
//     res.end()
// }) 

// app.get("/*.ejs", function (req, res){
//     afisareEroare(res, 400);
// })

// app.get("/*",function (req, res){
//     console.log(req.url);
//     try{
//         res.render("pagini"+req.url, function(err, rezHtml){
//             console.log("Eroare", err);
//             console.log("html:", rezHtml);
//             if (err){
//                 if (err.message.startsWith("Failed to lookup view")){
//                     afisareEroare(res, 404);
//                     console.log("Nu a gasit pagina:", req.url);
//                 }
//             }
//             else{
//                 res.send(rezHtml);
//             }
            
//         })
//     }
//     catch (err1){
//         if (err1.message.startsWith("Cannot find module")){
//             afisareEroare(res, 404);
//             console.log("Nu a gasit resursa:", req.url);
//             return;
//         }
//         afisareEroare(res);
//     }
// })

// function initErori(){
//     let continut= fs.readFileSync(path.join(__dirname, "resurse/json/erori.json")).toString("utf-8")
//     //console.log(continut)
//     obGlobal.obErori=JSON.parse(continut);
//     for (let eroare of obGlobal.obErori.info_erori){
//         eroare.imagine=path.join(obGlobal.obErori.cale_baza, eroare.imagine)
//     }
//     let err_def= obGlobal.obErori.eroare_default
//     err_def.imagine=path.join(obGlobal.obErori.cale_baza, err_def.imagine);
// }

// initErori()
// console.log(obGlobal.obErori)


// function afisareEroare(res, _identificator, _titlu, _text, _imagine){
//     let eroare = obGlobal.obErori.info_erori.find(
//         function (elem){
//             return elem.identificator==_identificator;
//         })
//     if (!eroare)
//         eroare=obGlobal.obErori.eroare_default;
//     res.render("pagini/eroare",
//         {
//             titlu: _titlu || eroare.titlu,
//             text: _text || eroare.text,
//             imagine: _imagine || eroare.imagine,
//         }
//     )

// }

 
 
// app.listen(8080);
// console.log("Serverul a pornit");

const express = require("express");
const fs= require('fs');

app= express();
console.log("Folder proiect", __dirname);
console.log("Cale fisier", __filename);
console.log("Director de lucru", process.cwd());
 
app.set("view engine","ejs");

app.use("/resurse", express.static(__dirname+"/resurse"));

app.get("/", function(req, res){
    res.send("<b style='color:red'>Buna </b> ziua!");
})
app.listen(8080);
console.log("Serverul a pornit");
