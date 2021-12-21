const mongoose = require("mongoose");

const connectionString = "mongodb+srv://magustincarbajal97:NXwUMBbedSFQhGID@cluster0.xkitr.mongodb.net/coderhouse?retryWrites=true&w=majority";

mongoose.connect(connectionString)
    .then(()=>{
        console.log("Conectado a base mongo db atlas")
    })
    .catch(()=>{
        console.log("Ocurrio un error en la conexion a la base de datos mongo db")
    })