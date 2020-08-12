
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
global.commandList = require("./assets/configs/commands/cmd-list").content;
global.Canvas = require("canvas");
global.built_ins = require("./assets/utils/utils.js");
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
function CommandManager(cache){
    this.cache = cache;
}
function ClientAdminsManager(cache){
    this.cache = cache;
}
function ClientOwnersManager(cache){
    this.cache = cache;
}
function CooldownsManager(cache){
    this.cache = cache;
}
client.commands = new CommandManager(new global.Discord.Collection());
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


(async function registerCommands(dir = "commands"){
let files = await global.fs.readdir(global.path.join(__dirname, dir));
for(let file of files){
  let stat = await global.fs.lstat(global.path.join(__dirname, dir, file));
  if(stat.isDirectory()) registerCommands(global.path.join(dir, file));
  else if(file.endsWith(".js")){
      let commandCode = require(global.path.join(__dirname, dir, file));
      let commandName = file.substring(0, file.indexOf(".js"));
      let commandModule = commandList.filter(function (command) {
        return command.name && command.name.toLowerCase() === commandName.toLowerCase() || command.aliases && command.aliases.filter((alias) => {
            return alias.toLowerCase() === commandName.toLowerCase();
                    }).length
      })[0];
     
      if(commandCode.run){
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
  ...configs,
  client: client,
 ...global,
  opt: {},
}

async function handleMessage(message) {

              imports.message = message;
        if ( (!imports.message.author || imports.message.author.bot)) return;
  
      imports.filter = require("./filter").run(imports).catch(console.error);
  
        if (!imports.message.content.startsWith(imports.prefix)) return;
        imports.args = imports.message.content.slice(imports.prefix.length).split(/ +/);
        imports.commandName = imports.args.shift().toLowerCase();
        if (!imports.commandName) return;
        imports.command = imports.getCommand(imports.commandName);


        if ( !imports.command || imports.command.disabled && imports.command.disabled === true) return;
        if(imports.filter && imports.filter === true)return;
        if(imports.command.dev && imports.command.dev === true && !(imports.admins.includes(imports.message.author.id) || imports.admins === imports.message.author.id))return;
        if (!imports.message.guild && (imports.command.av && (imports.command.av === "guild") || imports.command.wbh || imports.command.perms || imports.command.bot_perms)) return imports.message.channel.send("That command is only available in servers!");

        if (imports.message.guild) {
          if(imports.command.av && imports.command.av === "dm")return imports.message.channel.send("This command is only available in DM! Perhaps due to privacy reasons?");
          if ( imports.command.perms) {
            let permits = imports.command.perms.filter((perm) => { return !imports.message.member.hasPermission(perm) });
            if (permits.length) return imports.message.channel.send(imports.trim("You needs to have these permissions before proceeding: " + permits.join(", "), 2000));
          }

          if ( imports.command.bot_perms) {
            let permits = imports.command.bot_permissions.filter((perm) => { return !imports.message.guild.me.hasPermission(perm) });
            if ( permits.length) return imports.message.channel.send(imports.trim("The bot need these permissions before proceeding: " + permits.join(", "), 2000));
          }
          if ( imports.command.wbh && imports.message.channel.fetchWebhooks().then(wbh => wbh.length) > 10 - imports.command.wbh) return imports.message.channel.send(`This channel have reached it's maximum amount of webhooks possible. Please clear them up before proceeding.`);
        }
        if ( !imports.cooldowns.has(imports.command.name)) {
      imports.cooldowns.set(imports.command.name, new Discord.Collection());
        }
        imports.now = imports.message.createdTimestamp;
        imports.timestamps = imports.cooldowns.cache.get(imports.command.name);
        imports.cooldownAmount = (imports.command.cooldown || 5) * 1000;
        imports.expirationTime = imports.timestamps.get(imports.message.author.id) + imports.cooldownAmount;
        imports.timeLeft = (imports.expirationTime - imports.now) / 1000;
      
        if (imports.timestamps.has(imports.message.author.id) && imports.now < imports.expirationTime) {
         if(imports.options && imports.opt.bypassSlowmode && imports.opt.bypassSlowmode === true && imports.message.author.id === ""){
          // Bypass
         }else {
           return imports.message.channel.send(`Slowmode! Please wait another ${imports.timeLeft.toFixed(2)} seconds.`);
         }
        }
      
        imports.timestamps.set(imports.message.author.id, imports.now);
        setTimeout(() => {
          if (imports.timestamps.has(imports.message.author.id)) {
            imports.timestamps.delete(imports.message.author.id);
          } else {}
         }, imports.cooldownAmount);
    
        imports.command.run(imports).catch(e => {
          imports.message.channel.send("```"+imports.trim(require("util").inspect(e), 2000 - 6) + "```");
        })

}
  
  function cmdHandler(message){
    return handleMessage(message).catch(e => {
      message.channel.send("```" + built_ins.trim(require("util").inspect(e), 2000 - 6) + "```")
    });
  }
client.on("message", handleMessage);
client.on("messageUpdate", (m, message) => { return handleMessage(message);});

client.login();
