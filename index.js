

const express = require("express");
const fs= require('fs');
const path=require('path');
const sharp=require('sharp');
const { send } = require("process");
const ejs=require('ejs');

app= express();
console.log("Folder proiect", __dirname);
console.log("Cale fisier", __filename);
console.log("Director de lucru", process.cwd());
 


obGlobal = {
    obErori: null,
    obImagini:null
}

vect_foldere=["temp", "backup"]
for (let folder of vect_foldere){
    let caleFolder = path.join(__dirname, folder);
    if (!fs.existsSync(caleFolder)){
        fs.mkdirSync(caleFolder);
    }
}

app.set("view engine","ejs");

app.use("/resurse", express.static(__dirname+"/resurse"));

// app.get("/vector/:a", function(req, res){
//     let vec = [1,10,100,1000];
//     res.write(vec[req.params.a]+" ");
//     res.write(vec[req.params.a]*2+" ");
//     res.end();
// })

app.get("/favicon.ico", function (req, res){
    res.sendFile(path.join(__dirname, "resurse/favicon/favicon.ico"))
})

app.get("*/.ejs", function(req, res){
    afisareEroare(res, 400);
})



app.get(["/", "/home", "/index"], function(req, res){
    res.render("pagini/index", {ip:req.ip, imagini: obGlobal.obImagini.imagini});
});

// trimiterea unui mesaj fix
app.get("/cerere", function(req, res){
    res.send("<b>Hello</b> <span style='color:red'>world!</span>");

})

//trimiterea unui mesaj dinamic

app.get("/data", function(req, res, next){
    res.write("Data: ");
    next();
});
app.get("/data", function(req, res){
    res.write(""+new Date());
    res.end();

});

app.get("/suma/:a/:b", function (req, res){
    res.write(parseInt(req.params.a)+parseInt(req.params.b)+ "");
    res.end()
});

app.get(new RegExp("^\/resurse\/[a-zA-Z0-9_\/-]+\/$"), function (req,res){
    afisareEroare(res, 403);
});

app.get("/*", function(req, res){
    console.log(req.url);
    try{
        res.render("pagini"+req.url, function(err, rezHtml){
            // console.log("Eroare:", err);
            // console.log("html:", rezHtml);
            // res.send(rezHtml);
            if (err){
                if (err.message.startsWith("Failed to lookup view")){
                    afisareEroare(res, 404);
                    console.log("Nu a gasit pagina:", req.url);
                }
            }
            else{
                res.send(rezHtml);
            }
            res.send(rezHtml);
        })
    }
    catch (err1) {
        if (err1.message.startsWith("Cannot find module")){
            afisareEroare(res, 404);
            console.log("Nu a gasit resursa:", req.url);
            return;
        }
        afisareEroare(res);
    }
})

function initErori(){
    var continut = fs.readFileSync(path.join(__dirname, "resurse/json/erori.json")).toString("utf-8");
    console.log(continut);
    obGlobal.obErori=JSON.parse(continut);
    // console.log(obErori.cale_baza)
    for (let eroare of obGlobal.obErori.info_erori){
        eroare.imagine=path.join(obGlobal.obErori.cale_baza, eroare.imagine)
    }
    obGlobal.obErori.eroare_default=path.join(obGlobal.obErori.cale_baza, obGlobal.obErori.eroare_default.imagine)
    console.log(obGlobal.obErori);
    // let err_def=obGlobal.obErori.eroare_default
    // err_def.imagine=path.join(obGlobal.obErori.cale_baza, err_def.imagine); 

}
initErori()  


function afisareEroare(res, _identificator, _titlu, _text, _imagine){
    let eroare = obGlobal.obErori.info_erori.find(
        function (elem){
            return elem.identificator==_identificator;
        }
    )
    if (!eroare){
        let eroare_default=obGlobal.obErori.eroare_default;
        res.render("pagini/eroare", {
            titlu: _titlu || eroare_default.titlu,
            text: _text || eroare_default.text,
            imagine: _imagine || eroare_default.imagine,
        }) //al doilea argument este locals
        return;
    }
    else{
        if (eroare.status)
            res.status(eroare.identificator)

        res.render("pagini/eroare", {
            titlu: _titlu || eroare.titlu,
            text: _text || eroare.text,
            imagine: _imagine || eroare.imagine,
        })
        return;

    }
}

function initImagini(){
    var continut=fs.readFileSync(path.join(__dirname, "resurse/json/galerie.json")).toString("utf-8");

    obGlobal.obImagini=JSON.parse(continut);
    let vImagini=obGlobal.obImagini.imagini;

    let caleAbs=path.join(__dirname,obGlobal.obImagini.cale_galerie);
    let caleAbsMediu=path.join(__dirname, obGlobal.obImagini.cale_galerie, "mediu");
    let caleAbsMic=path.join(__dirname, obGlobal.obImagini.cale_galerie, "mic");
    
    if (!fs.existsSync(caleAbsMediu))
        fs.mkdirSync(caleAbsMediu);
    if (!fs.existsSync(caleAbsMic))
        fs.mkdirSync(caleAbsMic);
    
    for (let imag of vImagini){
        [numeFis, ext]=imag.fisier.split(".");
        let caleFisAbs = path.join(caleAbs, imag.fisier);
        let caleFisMediuAbs=path.join(caleAbsMediu, numeFis+".webp");
        let caleFisMicAbs=path.join(caleAbsMic, numeFis+".webp");
        sharp(caleFisAbs).resize(300).toFile(caleFisMediuAbs);
        sharp(caleFisAbs).resize(200).toFile(caleFisMicAbs);
        imag.fisier_mediu=path.join("/", obGlobal.obImagini.cale_galerie, "mediu", numeFis+".webp" )
        imag.fisier_mic=path.join("/", obGlobal.obImagini.cale_galerie, "mic", numeFis+".webp" )
        imag.fisier=path.join("/", obGlobal.obImagini.cale_galerie, imag.fisier)
    }
    console.log(obGlobal.obImagini)

}
initImagini();


app.listen(8080);
console.log("Serverul a pornit");
