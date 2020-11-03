var express = require("express");
var sha1 = require("sha1");
var router = express.Router();
var PELICULAS = require("../database/Peliculas");
var fileUpload = require("express-fileupload")

router.use(fileUpload 
({
    fileSize: 50 * 1024 * 1024,
    useTempFiles : true,
    tempFileDir: '/public/'
}));

router.post("/sendfile", (req, res) => {
    console.log(req.files);
    var image = req.files.file;
    var path = __dirname.replace(/\/routes/g, "/image");
    var date = new Date();
    var sing = sha1(date.toString()).substr(1, 5);

    image.mv(path + "/" + sing + "_" + image.name.replace(/\s/g,"_"), (err) => {
        if (err) {
            console.log(err);
            return res.status(300).send({msn : "ERROR AL ESCRIBIR EL ARCHIVO EN EL DISCO DURO"});
        }
        res.status(200).json({name : path + "/" + sing + "_" + image.name.replace(/\s/g,"_")});
    });
});

router.put("/sendfile/updateimage",async(req,res) => {
    console.log(req.files);
    var params = req.query;
    if(params.id == null)
    {
        res.status(300).json({msn: "EL PARAMETRO ID ES NECESARIO"});
        return;
    }
    var path = __dirname.replace(/\/routes/g, "/image");
    var date = new Date();
    var sing = sha1(date.toString()).substr(1, 5);
    var arrUrl=[];
    //recorre las imagenes enviadas para insertar y actualizar el objeto pelicula con el id
    req.files.file.forEach((dat,index)=>{
      arrUrl.push(path + "/" + sing + "_" + dat.name.replace(/\s/g,"_"));
      dat.mv(path + "/" + sing + "_" + dat.name.replace(/\s/g,"_"), (err) => {
          if (err) {
            console.log(err);
              return res.status(300).send({msn : "ERROR AL ESCRIBIR EL ARCHIVO EN EL DISCO DURO"});
          }
          console.log("imagen " + index + " insertada insertada");
      });
    });
    //rescatas el documento para actualizar tu coleccion
    let doc=await PELICULAS.findOne({_id:params.id});
    doc.Foto_Portada=arrUrl[0];
    doc.Foto_Principal=arrUrl[1];
    PELICULAS.findByIdAndUpdate(params.id,doc,()=>{
      res.status(200).json({
        message:'IMAGEN DE PORTADA PRINCIPAL INSERTADOS'
      });
    });
});


router.post("/peliculas", (req, res) => {
    var peliculasRest = req.body;
    var peliculasDB = new PELICULAS(peliculasRest);
    peliculasDB.save((err, docs) => {
        if (err) {
            var errors = err.errors;
            var msn = Object.keys(errors);
            var msn = {};

            for (var i = 0; i< keys.length; i++) {
                msn[keys[i]] = errors[keys[i]].message;
            }

            res.status(500).json(errors);
            return;
        }
        res.status(200).json(docs);
        return;
    });
});

router.get("/peliculas",(req, res) => 
{
    var filter = {};
    var params=req.query;
    var select = "";
    var order = {};
    if (params.Titulo_Pelicula != null)
    {
        var expresion = new RegExp(params.Titulo_Pelicula);
        filter["Titulo_Pelicula"] =  expresion;

    }

    //filtro 
    if(params.filters != null)
    {
        select = params.filters.replace(/,/g, " ");
    }
    if (params.order !=null)
    {
        var data = params.order.split(",");
        var number =parseInt(data[1]);
        order[data[0]] = number;
    }
    PELICULAS.find(filter).
    select(select).
    sort(order ).
    exec((err,docs) =>
    {
        if (err) 
        {
            res.status(500).json({msn:"Error en el Servidor"});
            return;
        }
        res.status(200).json(docs);
        return;
    });
});

router.put("/peliculas", (req, res) => 
{
    var params = req.query;
    var bodydata = req.body;
    if(params.id == null)
    {
        res.status(300).json({msn: "El parametro ID es necesario"});
        return;
    }
    var allowkeylist = ["Titulo_Pelicula", "Sinopsis", "Idioma"];  //especifica los datos que no deben actualizarce
    var keys = Object.keys(bodydata);
    var updateobjectdata = {};
    for (var i = 0; i < keys.length; i++)
    {
        if (allowkeylist.indexOf(keys[i]) > -1)
        {
            updateobjectdata[keys[i]] = bodydata[keys[i]];
        }
    } // este es todo el codigo
    PELICULAS.update({_id: params.id}, {$set: updateobjectdata}, (err, docs) =>
    {
    if (err)
    {
        res.status(500).json({msn: "Exite error en los datos"});
        return;
    }
    res.status(200).json(docs);
    });
});


router.delete("/peliculas", (req, res)=>
{
    var params = req.query;
    if (params.id == null)
    {
        res.status(300).json({msn: "El parametro es necesario"});
        return;
    }
    PELICULAS.remove({_id: params.id}, (err,docs) =>
    {
        if(err)
        {
        res.status(500).json({msn: "Exite error en la base datos"});
        return;
        }
        res.status(200).json(docs);
    });
});

module.exports = router;

