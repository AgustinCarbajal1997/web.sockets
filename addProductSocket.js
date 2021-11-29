const { options } = require("./options/my_sql_connection");
const knex = require("knex")(options);

const addProductSocket = (io, producToAdd) => {
  const newProduct = {
    title: producToAdd.title,
    price: producToAdd.price,
  };
  knex("products").insert(newProduct)
    .then(()=>{
      console.log("Agregado correctamente");
      return knex.from("products").select("*")
    })
    .then((products) => {
      io.sockets.emit("producto agregado", products);
    })

}

module.exports = addProductSocket;