const { options } = require("./options/sqlite3_connection");
const knex = require("knex")(options);


const chat = (io, dataMessage) => {
    knex("chat").insert(dataMessage)
    .then(()=>{
      console.log("Mensaje agregado correctamente");
      return knex.from("chat").select("*")
    })
    .then((chats) => {
        io.sockets.emit("nuevo mensaje", chats);
    })

}

module.exports = chat;