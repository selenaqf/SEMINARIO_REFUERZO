const mongoose = require("./connect");
var PELICULASSCHEMA = new mongoose.Schema ({  

Titulo_Pelicula : String,  
Descripcion     : String,  
Foto_Portada    : String,  
Foto_Principal  : String,  
Sinopsis        : String,  
Idioma          : String,
Raiting         : Number,
Lista           : [{

    Nombre_Servidor: String

}]

});

var PELICULAS = mongoose.model("Peliculas", PELICULASSCHEMA);
module.exports = PELICULAS;