var imagesize = require('imagesize');
const probe = require("probe-image-size");
const fs = require("fs");
const Discord = require("discord.js");
const prefix = process.env.PREFIX;
const commandList = require("./assets/cmd-list.json");
const Canvas = require("canvas");
const funfact = require("./assets/funfact.json").content;
const figlet = require("figlet");
const translate = require("@vitalets/google-translate-api");
const cooldowns = new Discord.Collection();
const badwords = require("./assets/badwords.json").contents;
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
const activities = require("./assets/activities.json").content;
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
});
app.get("/commands", (req, res) => {
res.send(require("./assets/cmd-list.json"))
})
app.get("/badwords", (req, res) => {
res.send(require("./assets/badwords.json"))
})

app.get("*", (req, res) => {
  res.send("200 - OK");
});

function customSplit(str, maxLength){
  if(str.length <= maxLength)  return str;
  var parts = str.match(new RegExp(".{1," + maxLength + "}","g"));
  return parts;
}
function arrayRemove(arr, value) {
  return arr.filter(function(ele) {
    return ele=value;
  });
}
function trim(string, max) {
  if (string.length <= max) return string;
  return `${string.slice(0, max - 3)}...`;
}
function getRandomFunfact(){
  return funfact[Math.floor(Math.random() * funfact.length)]
}
function getMemberFromMention(mention, message) {
  if (!mention) return;

  if (mention.startsWith("<@") && mention.endsWith(">")) {
    mention = mention.slice(2, -1);

    if (mention.startsWith("!")) {
      mention = mention.slice(1);
    }

    return message.guild.members.cache.get(mention);
  }
}
function getChannelFromMention(mention, message) {
  if (!mention) return;

  if (mention.startsWith("<#") && mention.endsWith(">")) {
    mention = mention.slice(2, -1);


    return message.guild.channels.cache.get(mention);
  }
}
client.once("ready", () => {
  let activity = activities[Math.floor(Math.random() * activities.length)];
  console.log("Gaz is inbound!");
  client.user.setActivity(activity.content + ` | ${process.env.PREFIX}help`, {type: activity.type});
  
});
client.on("ready", () => {
  setInterval(() => {
    let activity = activities[Math.floor(Math.random() * activities.length)];
    client.user.setActivity(activity.content + ` | ${process.env.PREFIX}help`, {type: activity.type});

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
if(message.channel.id === "729223426233073726" && message.author.bot === true) return message.delete().catch(error => {});
  if (message.author.bot) return;
  if(message.channel.id === "729222873058770986") {
    message.delete().catch(error => {});}
 
  var words = message.content.split("[").join(" ").split("]").join(" ").split("||").join(" ").split("`").join(" ").split("```").join(" ").split("__").join(" ").split(".").join(" ").split(",").join(" ").split(" ");
  
  var violates = words.filter(function(value, index, arr){ return badwords.includes(value.toLowerCase())   });
  violates = violates.filter(function(value, index, arr){ return value !== "classic"  });
  if(!message.content.startsWith("mw!noanime") &&message.guild && message.guild.id !== "380289224043266048" && violates.length && message.guild.members.cache.get("665419057075585025") && message.guild.members.cache.get("665419057075585025").hasPermission("MANAGE_MESSAGES")){
  const verb_warnings = new Discord.MessageEmbed()
  .setColor("#7289da")
  .setTitle("Content Deletion")
  .setAuthor(message.guild.name + " Moderation System", message.guild.iconURL({format: "png", dynamic: true}))
  .setDescription(trim("Our content moderation system have flagged one of your message contains badword(s). Issued content: ```" + message.content + "```" + `${violates.length} badwords found:\`\`\`` + violates.join("\n") + "``` \n This wont affect you at all (except the message you sent.) until we have implemented database to the bot.", 2000))
  .setFooter(`Prefix: ${process.env.PREFIX} | ` + getRandomFunfact(), "https://cdn.discordapp.com/avatars/675840311599300650/82ada90d0daf322dcea7bbbff92bee90.png?width=406&height=406")  
const author = message.author;

message.delete()
author.send(verb_warnings).catch(error => {

})
}
  /*if (message.guild) {
		let prefixUsed;

		if (message.content.startsWith(prefix)) {
			prefixUsed = prefix;
		} else {
			
			const guildPrefix = await prefixes.get(message.guild.id);
			if (message.content.startsWith(guildPrefix)) prefixUsed = guildPrefix;
		}*/

  if (!message.content.startsWith(prefix)) return;

  var args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  if(!commandName)return;
 
    var commandModule = commandList.content.filter(function(value, index, arr){ return value.name === commandName || value.aliases && value.aliases.includes(commandName)});
    if(!commandModule.length) return;
  
    if(commandModule.length > 1) return message.channel.send("It seems there is multiple instances of that command in the command list module. Please file a bug report and submit it to the support server.");
    commandModule = commandModule[0];
  
  
   
  

  
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
  
    const command = client.commands.get(commandModule.name);
    
    if (!command || !commandName) return message.channel.send( `**\`${commandName}\`** is not a valid command!`);
    
    if(commandModule.guild && commandModule.guild === true && message.channel.type === "dm") return message.channel.send("Sorry, that command is a guild only thing.");
 

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
     trim: trim,
     getMemberFromMention: getMemberFromMention,
     timestamps: timestamps,
     customSplit: customSplit,
     probe: probe,
     figlet: figlet,
     translate: translate,
     got: got,
     arrayRemove: arrayRemove,
     Canvas: Canvas,
     querystring: querystring,
     fetch: fetch,
     customSplit: customSplit,
     getChannelFromMention: getChannelFromMention
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
