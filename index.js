
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
global.Canvas = require("canvas");
global.built_ins = require("./assets/utils");
global.figlet = require("figlet");
global._ = require('underscore');
global.badwords = require("./assets/configs/badwords").contents;
const client = new global.Discord.Client({
  partials: ["REACTION", "MESSAGE"],
  ws: {
    intents: [
      "GUILDS",
      "GUILD_MESSAGES",
      "DIRECT_MESSAGES",
      "GUILD_MESSAGE_REACTIONS",
      "DIRECT_MESSAGE_REACTIONS"
    ]
  }
});
global.configs = require("./assets/configs/configs")
global.xml2js = require("xml2js");
global.querystring = require("querystring");
global.fetch = require("node-fetch");
global.grau = require("node-grau");
const db = new global.grau(process.env.DB, 'bot');
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

global.configs.owners.forEach((owner) => {
  client.owners.cache.set(owner, owner);
})


client.once("ready", () => {

  console.log("Gaz is inbound!");
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

client.on("guildCreate", async (guild) => {
  try {
  client.channels.cache.get("730374154569646091").send(`<@!${guild.ownerID}>`).then((message) => {
    const user = message.mentions.users.get(guild.ownerID);
    const userID = db.getDoc('users', user.id);
    const embed = new global.Discord.MessageEmbed()
    .setColor(global.colors.BG_COLOR)
    .setAuthor(user.username, user.displayAvatarURL({format:"png", dynamic: true}))
    .setTitle("Server invited Kylebot")
    .setThumbnail(global.built_ins.getItem('emblem', user.emblem))
    .setImage(global.built_ins.getItem('playercard', user.playercard))
    .setTimestamp()
    .setFooter(`Prefix: ${global.configs.prefix} | ${global.built_ins.getRandomFunfact()}`)
    message.channel.send(embed);
  })
  } catch{

  }
})

(async function registerCommands(dir = "commands") {
  let files = await global.fs.readdir(global.path.join(__dirname, dir));
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
          ...commandCode,
          ...commandModule,
          name: commandName
        }
        client.commands.cache.set(commandName, command);
      }
    }
  }
})()

var imports = {
  db: db,
  ...built_ins,
  ...global.configs,
  client: client,
  ...global,
  opt: {},
}


function cmdHandler(message) {
  return require("./handler.js")(imports, message).catch(e => {
    message.channel.send("```" + built_ins.trim(require("util").inspect(e), 2000 - 6) + "```")
  });
}
client.on("message", cmdHandler);
client.on("messageUpdate", (m, message) => { return cmdHandler(message) });

client.login();
