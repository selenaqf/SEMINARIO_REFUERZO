var express = require("express");
var router = express.Router();
var PELICULAS = require("../database/Peliculas");

router.post("/peliculas", (req, res) => {
    var peliculasRest = req.body;
    var peliculasDB = new PELICULAS(peliculasRest);
    peliculasDB.save((err, docs) => {
        if (err) {
            var errors = err.errors;
            res.status(500).json(errors);
            return;
        }
        res.status(200).json(docs);
        return;
    });
});

router.get("/peliculas", (req, res) => {

});

router.put("/peliculas", (req, res) => {

});

router.delete("/peliculas", (req, res) => {

});

module.exports = router;

