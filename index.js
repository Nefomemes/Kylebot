
 process.on("unhandledRejection", function(reason, promise) {
  console.error("Unhandled rejection", { reason: reason, promise: promise });
});

process.on("uncaughtException", err => {
  console.error("There was an uncaught error", err);
  process.exit(1); //mandatory (as per the Node docs)
});
const db = require("./assets/utils/database");
const colors = require("./assets/configs/color").content;
var imagesize = require('imagesize');
const probe = require("probe-image-size");
const fs = require("fs");
const Discord = require("discord.js");
const { prefix, website, support, brandingbg } = require("./assets/configs/configs");
const commandList = require("./assets/configs/commands/cmd-list");
const Canvas = require("canvas");
const built_ins = require("./assets/utils/utils.js");
const figlet = require("figlet");
const translate = require("@vitalets/google-translate-api");
const _ = require('underscore');
const cooldowns = new Discord.Collection();
const badwords = require("./assets/configs/badwords").contents;
const client = new Discord.Client({
  partials: ["REACTION", "MESSAGE"],
  ws: {
    intents: [
      "GUILDS",
      "GUILD_MESSAGES",
      "DIRECT_MESSAGES",
      "DIRECT_MESSAGE_REACTIONS"
    ]
  }
});

const xml2js = require("xml2js");
const querystring = require("querystring");
const fetch = require("node-fetch");
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

const got = require("got");
const FileType = require("file-type");
var sizeOf = require("image-size");


var path = require('path');



/*const Keyv = require('keyv');*/
/*const prefixes = new Keyv('sqlite://path/to/database.sqlite');*/
/*keyv.on('error', err => console.error('Keyv connection error:', err));*/

const express = require("express");
const app = express();
const http = require("http");

/*
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://nefobot-hosting.glitch.me/`);
}, 150000);
*/




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Gaz is closing in. PORT ${ PORT }`);
    require("./req-handler.js").execute({app: app})
});










client.once("ready", () => {
  
  console.log("Gaz is inbound!");
    built_ins.freshActivity(client);
  
});
client.on("ready", () => {
  setInterval(() => {
    built_ins.freshActivity(client);
}, 150000); 
})
client.on("error", (err)=> {
    console.err(err);
});





for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}
function handleMessage(message){
    if(!message.author)return;
if(message.author.bot) return;

require("./filter.js").execute({db: db, message: message, Discord: Discord, client: client, built_ins: built_ins, colors: colors})
if(!message.content.startsWith(prefix))return;
  

  var args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  if(!commandName)return;
 
    var commandModule = built_ins.getCommand(commandName, {type: "module"});
  if(!commandModule) return;
    if(commandModule.disabled && commandModule.disabled === true) return message.react("❌")
  
  
    if(message.guild){  
      if(message.guild.id !== "712195322230865994" && commandModule.category && commandModule.category.toLowerCase() === "nefomemes' coding bunker exclusive")return message.channel.send("Oops, that command is only available at Nefomemes' Coding Bunker. Use `mw!codingbunker` for more information.")
      if(commandModule.permissions){
  
        const permits = commandModule.permissions.filter(function(value, index, arr){ return !message.member.hasPermission(value)});
     
     if(permits.length) return message.react("❌")
  
    }
       if(commandModule.bot_permissions){
  
        const permits = commandModule.bot_permissions.filter(function(value, index, arr){ return !message.guild.me.hasPermission(value)});
       
       if(permits.length)return message.react("❌");
  
      }
  
      if(!message.channel.permissionsFor(client.user.id).has("SEND_MESSAGES") || !message.channel.permissionsFor(client.user.id).has("EMBED_LINKS") || !message.channel.permissionsFor(client.user.id).has("ATTACH_FILES")) returnmessage.react("❌")
  
      if(commandModule.webhooks && message.guild.fetchWebhooks().then(map => map.length) > 10 - commandModule[0].webhooks) return message.react("❌")
  
    } 
  
    if(!message.guild && commandModule.guild && commandModule.guild === true || !message.guild && commandModule.permissions &&commandModule.permissions || !message.guild && commandModule.bot_permissions && commandModule.bot_permissions || !message.guild && commandModule.webhooks)return message.react("❌")
  
    const command = built_ins.getCommand(commandModule.name, {type: "command", client: client});
    
    if (!command) return message.react("❌")
    


  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 5) * 1000;
  const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
  const timeLeft = (expirationTime - now) / 60000;

  if (timestamps.has(message.author.id) && now < expirationTime){
    if (
      message.author.id === "665419057075585025" &&  message.content.toLowerCase().endsWith(" --debug")
    ) {
      args.pop();
    } else {
      return message.react("❌")
    }
  }
  
  timestamps.set(message.author.id, now);
  setTimeout(() => {
    if(timestamps.has(message.author.id)){
      timestamps.delete(message.author.id);
    }
   }, cooldownAmount);

   var imports = {
     ...built_ins,
     message: message,
     args: args,
     client: client,
     Discord: Discord,
      website: website,
      support: support,
      brandingbg: brandingbg,
      prefix: prefix,
     timestamps: timestamps,
     probe: probe,
     figlet: figlet,
     translate: translate,
     got: got,
    _:_,
     Canvas: Canvas,
     querystring: querystring,
     fetch: fetch,
    colors: colors,
    db: db

   }

  try {
      if(!command.run)return imports.message.react("❌")
    command.run(imports).catch(err => {
      message.channel.send(`An error occured! ${err}`);
      console.error(err);
    }); 
  } catch (error) {
   
    message.channel.send(`An error occurred! ${error}`);
  }
  
}
client.on("message", async (message) => {
handleMessage(message);
});
client.on("messageUpdate", async (oldMessage, newMessage) => {
handleMessage(newMessage);
});

client.login(process.env.DISCORD_TOKEN);
