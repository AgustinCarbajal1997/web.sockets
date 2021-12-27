const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const { options } = require("../options/my_sql_connection");
const knex = require("knex")(options);
const storage = multer.diskStorage({
  destination: function (request, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (request, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// OBTENER TODOS LOS PRODUCTOS
router.get("/", (request, response) => {
  knex
    .from("products")
    .select("*")
    .then((products) => {
      console.log(products);
      response.render("main", { products, link: "/", name:request.session.name });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
