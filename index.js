
process.on("unhandledRejection", function (reason, promise) {
  console.error("Unhandled rejection", { reason: reason, promise: promise });
});

process.on("uncaughtException", err => {
  console.error("There was an uncaught error", err);
  process.exit(1); //mandatory (as per the Node docs)
});
global.colors = require("./assets/configs/color").content;

global.fs = require("fs").promises;
global.Discord = require("discord.js");
global.commandList = require("./assets/commands/cmd-list").content;
global.built_ins = require("./assets/utils");
global._ = require('underscore');
global.badwords = require("./assets/configs/badwords").contents;
const client = new global.Discord.Client({
  partials: ["REACTION", "MESSAGE"],
  ws: {
    intents: [
      "GUILDS",
      "GUILD_PRESENCES",
      "GUILD_MESSAGES",
      "DIRECT_MESSAGES",
      "GUILD_MESSAGE_REACTIONS",
      "DIRECT_MESSAGE_REACTIONS",
      "GUILD_MEMBERS",
      "GUILD_PRESENCES"
    ]
  }
});
global.client = client;
global.configs = require("./assets/configs/configs")
global.xml2js = require("xml2js");
global.querystring = require("querystring");
global.fetch = require("node-fetch");
global.grau = require("node-grau");
global.db = new global.grau(process.env.DB, 'bot');

const ReplDatabase = require("@replit/database");
const replDB = new ReplDatabase(); 
global.replDB = replDB;
function CommandsManager(cache) {
  this.cache = cache;
}
function ClientAdminsManager(cache) {
  this.cache = cache;
}
function ClientOwnersManager(cache) {
  this.cache = cache;
}
function CooldownsManager(cache) {
  this.cache = cache;
}
client.commands = new CommandsManager(new global.Discord.Collection());
client.admins = new ClientAdminsManager(new global.Discord.Collection());
client.owners = new ClientOwnersManager(new global.Discord.Collection());
client.cooldowns = new CooldownsManager(new global.Discord.Collection());
global.path = require('path');
global.express = require("express");
const app = global.express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Gaz is closing in. PORT ${PORT}`);
  require("./req-handler.js").execute({ app: app })
});

client.once("ready", () => {
    console.log("Gaz is inbound")

global.configs.owners.forEach((owner) => {
    if(!owner) return
 const user = client.users.fetch(owner.toString())
 if(!user)return
  return client.owners.cache.set(owner, user);
})
 
global.built_ins.freshActivity(client);
});
client.on("ready", () => {
  setInterval(() => {
    global.built_ins.freshActivity(client);
  }, 150000);
})
client.on("error", (err) => {
  console.err(err);
});






(async function registerCommands(dir = "commands") {
   files = await global.fs.readdir(global.path.join(__dirname, dir));
  for (let file of files) {
    let stat = await global.fs.lstat(global.path.join(__dirname, dir, file));
    if (stat.isDirectory()) registerCommands(global.path.join(dir, file));
    else if (file.endsWith(".js")) {
      let commandCode = require(global.path.join(__dirname, dir, file));
      let commandName = file.substring(0, file.indexOf(".js"));
      let commandModule = commandList.filter(function (command) {
        return command.name && command.name.toLowerCase() === commandName.toLowerCase() || command.aliases && command.aliases.filter((alias) => {
          return alias.toLowerCase() === commandName.toLowerCase();
        }).length
      })[0];

      if (commandCode.run) {
        let command = {
          ...commandModule,
          ...commandCode,
          name: commandName
        }
        client.commands.cache.set(commandName, command);
      }
    }
  }
})()

async function registerEvents() {
    let files = await global.fs.readdir(global.path.join(__dirname, "events"));
    for(let file of files){
        let stat = await global.fs.lstat(global.path.join(__dirname, "events", file));
        if(!stat.isDirectory() && file.endsWith(".js")){
                  let eventName = file.substring(0, file.indexOf(".js"));
                 client.on(eventName, require(global.path.join(__dirname, "events", eventName)));
        }
    }
}

registerEvents()
client.login();
const Database = require("@replit/database");
const db = new Database();
