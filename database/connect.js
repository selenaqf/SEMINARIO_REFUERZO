const mongoose = require('mongoose');
mongoose.connect("mongodb://172.26.0.2:27017/PELICULAS", {useNewUrlParser: true});
var db = mongose.connection;
db.on("ERROR", () => {
    console.log("ERROR NO SE PUEDE CONECTAR AL SERVIDOR");
});
db.on("OPEN", () => {
    console.log("CONEXION EXITOSA");
});

module.exports = mongoose;

