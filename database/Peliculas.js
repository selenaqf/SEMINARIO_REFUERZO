const mongoose = require("./connect");
var PELICULASSCHEMA = {  
name        : String,  
email       : String,  
password    : String,  
registerdate: Date,  
sex         : String,  
address     : String
}

const PELICULAS = mongoose.model("users", PELICULASSCHEMA);
module.exports = PELICULAS;