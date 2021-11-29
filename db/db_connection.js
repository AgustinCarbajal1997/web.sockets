const listProductsToAdd = [
  { title: "Aspiradora sin bolsa", price: "5000" },
  { title: "Tomate kg", price: "280" },
  { title: "Coca Cola 3lt", price: "400" },
  { title: "Huevos", price: "600" },
  { title: "rucula", price: "300" },
  { title: "Lays", price: "250" },
];

const { options } = require("../options/my_sql_connection");
const knex = require("knex")(options);

knex.schema
  .dropTableIfExists("products")
  .then(()=>{
    return knex.schema.createTable("products", (table) => {
      table.increments("id");
      table.string("title");
      table.integer("price");
    })
  })
  .then(() => {
    console.log("Creado tabla con exito");
    return knex("products").insert(listProductsToAdd);
  })
  .then(() => {
    console.log("Insertados productos con exito");
  })
  .catch((error) => {
    console.log(error);
    throw error;
  })
