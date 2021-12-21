const message = require("./models/chat");
const normalizr = require("normalizr");
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;
const util = require("util");

const chat = async (io, dataMessage) => {
  try {
    const newMessage = new message(dataMessage);
    await newMessage.save();
    let messageList = await message.find({});
    messageList = JSON.parse(JSON.stringify(messageList));

    let dataToNormalize = {
      id: "mensajes",
      mensajes: [...messageList],
    };

    // normalize
    const authorSchema = new schema.Entity("author");
    const messageSchema = new schema.Entity("message");

    const chatSchema = new schema.Entity("chats", {
      author: authorSchema,
      message: messageSchema,
    });

    const mensajes = new schema.Entity("mensajes", {
      mensajes: [chatSchema],
    });

    const normalizeChat = normalize(dataToNormalize, mensajes);

    const print = (obj) => {
      console.log(util.inspect(obj, false, 12, true));
    };

    print(normalizeChat);

    io.sockets.emit("nuevo mensaje", normalizeChat);
  } catch (error) {
    console.log(error);
  }
};

module.exports = chat;
