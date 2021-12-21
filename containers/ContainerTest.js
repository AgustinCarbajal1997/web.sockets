const faker = require("faker");
const { v4: uuidv4 } = require('uuid');
class FakeMock {

    generateProducts(){
        let products = [];
        for (let i = 0; i < 5; i++) {
            const product = {
                id:uuidv4().slice(1,5),
                title:faker.commerce.productName(),
                price:faker.commerce.price(2,4,2),
                image:faker.image.food()
            }
            products = [...products, product];
        }
        return products;
    }    

}


module.exports = FakeMock;