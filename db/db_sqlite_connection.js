const { options } = require("../options/sqlite3_connection");
const knex = require("knex")(options);

knex.schema
  .dropTableIfExists("chat")
  .then(()=>{
    return knex.schema.createTable("chat", (table) => {
      table.increments("id");
      table.string("email");
      table.integer("date");
      table.integer("text");
    })
  })
  .then(() => {
    console.log("Creado tabla de chat con exito");
  })
  .catch((error) => {
    console.log(error);
    throw error;
  })