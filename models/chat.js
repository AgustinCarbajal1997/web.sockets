const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// const authorSchema = new Schema({
//   id: String,
//   nombre: String,
//   apellido: String,
//   edad: Number,
//   alias: String,
//   email:String
// });
// authorSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     (returnedObject.id = returnedObject._id),
//       delete returnedObject._id,
//       delete returnedObject.__v;
//   },
// });

const messageSchema = new Schema({
  author: Object,
  message: String,
  date:String
});

messageSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    (returnedObject.id = returnedObject._id),
      delete returnedObject._id,
      delete returnedObject.__v;
  },
});

const message = model("message", messageSchema);

module.exports = message;
