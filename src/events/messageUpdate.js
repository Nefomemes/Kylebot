const handler = require("./utils/handler");
module.exports = async (oldMessage, newMessage) => handler(newMessage, oldMessage);