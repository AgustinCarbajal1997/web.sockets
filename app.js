const express = require("express");
const addProductSocket = require("./addProductSocket");
const test = require("./routes/test");
const chat = require("./chat");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const handlebars = require("express-handlebars");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const advacedOption = { useNewUrlParser:true, useUnifiedTopology:true };
const app = express();
const httpserver = new HttpServer(app);
const io = new IOServer(httpserver);
// db connection
require("./db/db_connection");
require("./db/db_sqlite_connection");
require("./db/mongoconnection");

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
app.use(session({
  store: MongoStore.create({
    mongoUrl:"mongodb+srv://magustincarbajal97:NXwUMBbedSFQhGID@cluster0.xkitr.mongodb.net/sessions?retryWrites=true&w=majority",
    mongoOptions:advacedOption
  }),
  secret:"secreto",
  resave: true,
  saveUninitialized:true
}))


// routes
const indexRouter = require("./routes/index");
const productsRouter = require("./routes/productos");

app.post("/saveSession", (req, res)=>{
  req.session.name = req.body.name;
  res.redirect("/productos");
})
app.get("/destroySession", (req, res)=>{
  req.session.destroy(error => {
    if(error){
      return res.json({ message: "Ocurrio un error al desloguearse" })
    }
    res.redirect("/");
  })
})

function auth(req, res, next){
  if(!req.session.name){
    console.log("el name es este", req.session.name)
    return res.redirect("/")
  }
  console.log("el name es este", req.session.name)
  next()
}
app.use("/productos", auth, productsRouter);
app.use("/api/productos-test", test);
app.use("/", indexRouter);




const server = httpserver.listen(8080, () => {
  console.log("Servidor web iniciado");
});
io.on("connection", (socket) => {
  console.log("Usuario conectado");
  socket.emit("mi mensaje", "Este mensaje desde el servidor");
  socket.on("agregar producto", (producToAdd) => {
    addProductSocket(io, producToAdd);
  });
  socket.on("enviar mensaje", (dataMessage) => {
    chat(io, dataMessage);
  });
});
server.on("error", (error) => console.log("Error en el servidor", error));
