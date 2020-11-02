var express = require("express");
var router = express.Router();
var PELICULAS = require("../database/Peliculas");

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

router.get("/peliculas", (req, res) => {
        PELICULAS.find({}).
        exec((err, docs) => {
        if (err) {
            res.status(500).json({msn: "ERROR EN EL SERVIDOR"});
            return;
        }  
        res.status(200).json(docs);
        return;
    });
});
 

router.put("/peliculas", (req, res) => {

});

router.delete("/peliculas", (req, res) => {

});

module.exports = router;

