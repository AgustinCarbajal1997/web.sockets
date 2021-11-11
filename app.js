const express = require("express");
const addProductSocket = require("./addProductSocket");
const chat = require("./chat");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const handlebars = require("express-handlebars");
const app = express();
const httpserver = new HttpServer(app);
const io = new IOServer(httpserver);

app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);

app.set("view engine", "hbs");
app.set("views", "./views");

// settings
app.use("/static", express.static(__dirname + "/public"));
app.use("/images", express.static(__dirname + "/uploads"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
const indexRouter = require("./routes/index");
const productsRouter = require("./routes/productos");

app.use("/productos", productsRouter);
app.use("/", indexRouter);

const server = httpserver.listen(8080, () => {
  console.log("Servidor web iniciado");
});
io.on("connection", (socket) => {
  console.log("Usuario conectado");
  socket.emit("mi mensaje", "Este mensaje desde el servidor");
  socket.on("agregar producto", (producToAdd) => {
    addProductSocket(io,producToAdd)
  });
  socket.on("enviar mensaje", (dataMessage)=>{
    chat(io,dataMessage);
  })
});
server.on("error", (error) => console.log("Error en el servidor", error));
