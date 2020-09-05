const handler = require("./utils/handler");
global.client.on("messageUpdate", (oldMessage, newMessage) => {
    handler(newMessage, oldMessage)
})