let chatData = [];
const chat = (io, dataMessage) => {
    chatData = [...chatData, dataMessage];
    io.sockets.emit("nuevo mensaje", chatData);
}

module.exports = chat;