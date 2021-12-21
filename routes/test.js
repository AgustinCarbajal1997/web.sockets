const express = require("express");
const router = express.Router();
const FakeMock = require("../containers/ContainerTest");

router.get("/", (request, response)=>{
    const createProducts = new FakeMock()
    const products = createProducts.generateProducts();
    response.render("main", { products, link: "/" });
})

module.exports = router;