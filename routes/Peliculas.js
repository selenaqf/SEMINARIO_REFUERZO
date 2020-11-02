var express = require("express");
var router = express.Router();
var PELICULAS = require("../database/Peliculas");
var fileUpload = require("express-fileupload")
router.use(fileUpload ({

}));

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

