const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
    destination:function(request, file, cb){
        cb(null,path.join(__dirname,"../uploads"))
    },
    filename:function(request, file, cb){
        cb(null,file.originalname)
    }
})
const upload = multer({ storage });




// OBTENER TODOS LOS PRODUCTOS
router.get("/", (request, response)=>{
    fs.readFile(path.join(__dirname,"../public", "db.json"),(error, data)=>{
        if(error){
            console.log(error)
            response.status(404).json({ error:"Ocurrio un error" })
        }else{
            const products = JSON.parse(data).map(item => {
                return {
                    id:item.id,
                    title:item.title,
                    price:item.price
                }
            })
            
            response.render("main",{ products, link:"/" })
        }
    })
    
})





module.exports = router;