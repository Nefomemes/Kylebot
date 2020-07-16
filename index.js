var imagesize = require('imagesize');
const probe = require("probe-image-size");
const fs = require("fs");
const Discord = require("discord.js");
const prefix = process.env.PREFIX;
const commandList = require("./assets/config/cmd-list.json");
const Canvas = require("canvas");
const built_ins = require("./assets/utils/utils.js");
const figlet = require("figlet");
const translate = require("@vitalets/google-translate-api");
const _ = require('underscore');
const cooldowns = new Discord.Collection();
const badwords = require("./assets/configs/badwords.json").contents;
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
    require("./req-handler.js").execute({app: app}).catch(error => console.error(error))
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
process.on("unhandledRejection", function(reason, promise) {
  console.error("Unhandled rejection", { reason: reason, promise: promise });
});

process.on("uncaughtException", err => {
  console.error("There was an uncaught error", err);
  process.exit(1); //mandatory (as per the Node docs)
});

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

client.on("message", async message => {
if(message.author.bot) return;
  /*if (message.guild) {
		let prefixUsed;

		if (message.content.startsWith(prefix)) {
			prefixUsed = prefix;
		} else {
			
			const guildPrefix = await prefixes.get(message.guild.id);
			if (message.content.startsWith(guildPrefix)) prefixUsed = guildPrefix;
		}*/
require("./filter.js").execute({message: message, Discord: Discord, client: client, built_ins: built_ins})
if(!message.startsWith(prefix))return;
  

  var args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  if(!commandName)return;
 
    var commandModule = built_ins.getCommand(CommandName, {type: "module"});
  if(!commandModule) return;
    if(commandModule.disabled && commandModule.disabled === true) return message.channel.send("Sorry, that command is currently disabled.")
  
  
    if(message.guild){  
      if(message.guild.id !== "712195322230865994" && commandModule.category && commandModule.category.toLowerCase() === "nefomemes' coding bunker exclusive")return message.channel.send("Oops, that command is only available at Nefomemes' Coding Bunker. Use `mw!codingbunker` for more information.")
      if(commandModule.permissions){
  
        const permits = commandModule.permissions.filter(function(value, index, arr){ return !message.member.hasPermission(value)});
     
     if(permits.length) return message.channel.send("Before you can use the `" + command.name + "`, you need to have these permissions: " + permits.join(", ").toLowerCase().split("_").join(" "));
  
    }
       if(commandModule.bot_permissions){
  
        const permits = commandModule.bot_permissions.filter(function(value, index, arr){ return !message.guild.me.hasPermission(value)});
       
       if(permits.length) return message.channel.send("Before you can use the `" + command.name + "`, the bot need to have these permissions: " + permits.join(", ").toLowerCase().split("_").join(" "));
  
      }
  
      if(!message.channel.permissionsFor(client.user.id).has("EMBED_LINKS") || !message.channel.permissionsFor(client.user.id).has("ATTACH_FILES")) return message.channel.send("An error occured. Try checking the bot's permissions. Especially embed links and attach files 'cuz they are commonly used.");
  
      if(commandModule.webhooks && message.guild.fetchWebhooks().then(map => map.length) > 10 - commandModule[0].webhooks) return message.channel.send("Whoa, dude. It seems there is too many webhooks in this server but the bot needs **" + commandModule[0].webhooks + "** webhooks. Try reducing the webhooks. \n **Pro tip:** Try delete the NQN webhooks. NQN creates a lot of webhooks but doesn't clean it's mess.");
  
    } 
  
    if(!message.guild && commandModule.guild && commandModule.guild === true || !message.guild && commandModule.permissions &&commandModule.permissions || !message.guild && commandModule.bot_permissions && commandModule.bot_permissions || !message.guild && commandModule.webhooks) return message.channel.send("That command is not available in DM!")
  
    const command = built_ins.getCommand(commandModule.name, {type: "command", client: client});
    
    if (!command) return message.channel.send( `**\`${commandName}\`** is not a valid command!`);
    


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
      return message.channel.send(
        `It's too spammy! Please wait another ${timeLeft.toFixed(
          2
        )} minutes before using the **\`${command.name}\`** command again.`
      );
    }
  }
  
  timestamps.set(message.author.id, now);
  setTimeout(() => {
    if(timestamps.has(message.author.id)){
      timestamps.delete(message.author.id);
    }
   }, cooldownAmount);

   var imports = {
     getRandomFunfact: getRandomFunfact,
     message: message,
     args: args,
     client: client,
     Discord: Discord,

     timestamps: timestamps,
     probe: probe,
     figlet: figlet,
     translate: translate,
     got: got,
    _:_,
     Canvas: Canvas,
     querystring: querystring,
     fetch: fetch,
 

   }

  try {
    command.execute(imports); 
  } catch (error) {
    console.error(error);
    message.reply(`An error occurred! ${error}`);
  }
  //}
});

client.login(process.env.DISCORD_TOKEN);
