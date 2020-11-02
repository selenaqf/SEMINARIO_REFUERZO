const mongoose = require("./connect");
var PELICULASSCHEMA = {  
Titulo_Pelicula : String,  
Descripcion     : String,  
Foto_Portada    : String,  
Foto_Principal  : Date,  
Sinopsis        : String,  
Idioma          : String,
Raiting         : String,
Lista           : Array
}

const PELICULAS = mongoose.model("users", PELICULASSCHEMA);
module.exports = PELICULAS;