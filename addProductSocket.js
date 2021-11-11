const fs = require("fs");
const path = require("path");
const addProductSocket = (io, producToAdd) => {
    fs.readFile(path.join(__dirname, "public", "db.json"), (error, data) => {
        if (error) {
          console.log(error);
        } else {
          let totalProducts = JSON.parse(data);
          const maxId = Math.max(...JSON.parse(data).map((item) => item.id)) + 1;
          const newProduct = {
            id: maxId,
            title: producToAdd.title,
            price: producToAdd.price,
          };
          totalProducts = [...totalProducts, newProduct];
          fs.writeFile(
            path.join(__dirname, "public", "db.json"),
            JSON.stringify(totalProducts),
            (error) => {
              if (error) {
                console.log(error);
                return;
              }
              fs.readFile(path.join(__dirname, "public", "db.json"),(error,products)=>{
                if(error){
                  console.log(error)
                }else{
                  io.sockets.emit("producto agregado", JSON.parse(products));
                }
              })
            }
          );
        }
      });
}

module.exports = addProductSocket;