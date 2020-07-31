
process.on("unhandledRejection", function (reason, promise) {
  console.error("Unhandled rejection", { reason: reason, promise: promise });
});

process.on("uncaughtException", err => {
  console.error("There was an uncaught error", err);
  process.exit(1); //mandatory (as per the Node docs)
});
const colors = require("./assets/configs/color").content;

const fs = require("fs");
const Discord = require("discord.js");
/*const branding = require("./assets/configs/configs");*/
const { prefix, website, support, brandingbg } = require("./assets/configs/configs");
const commandList = require("./assets/configs/commands/cmd-list");
const Canvas = require("canvas");
const built_ins = require("./assets/utils/utils.js");
const figlet = require("figlet");
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
           "GUILD_MESSAGE_REACTIONS",
      "DIRECT_MESSAGE_REACTIONS"
    ]
  }
});

const xml2js = require("xml2js");
const querystring = require("querystring");
const fetch = require("node-fetch");
const grau = require("node-grau");
const db = new grau(process.env.DB, 'bot');
client.commands = new Discord.Collection();

var path = require('path');

const express = require("express");
const app = express();
const http = require("http");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Gaz is closing in. PORT ${PORT}`);
  require("./req-handler.js").execute({ app: app })
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
client.on("error", (err) => {
  console.err(err);
});



const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

/*var imports = {
  db: db,
  ...built_ins,
  ...branding,
  client: client,
  Discord: Discord,
  figlet: figlet,
  _: _,
  querystring: querystring,
  fetch: fetch,
  colors: colors,
  opt: {},
  cooldowns: cooldowns
}*/
/*
function handleMessage(message) {
  return new Promise((resolve, reject) => {
    try {
      (async function () {
              imports.message = message;
        if ( (!imports.message.author || imports.message.author.bot)) resolve(imports.message.channel.send("Error code pre-beta 4."));
  
      require("./filter").run(imports).catch(reject);
        if (!imports.message.content.startsWith(imports.prefix)) resolve(/* imports.message.channel.send("Error code pre-beta 3.")*//*);
        imports.args = imports.message.content.slice(imports.prefix.length).split(/ +/);
        imports.commandName = imports.args.shift().toLowerCase();
        if (!imports.commandName) resolve(imports.message.channel.send("Error code pre-beta 1."));
        imports.commandModule = built_ins.getCommand(commandName, { type: "module" });

        if ( !imports.commandModule || imports.commandModule.disabled && imports.commandModule.disabled === true) resolve(imports.message.channel.send("Error code pre-beta 2."));
        if (!imports.message.guild && (imports.commandModule.av && (imports.commandModule.av === "guild") || imports.commandModule.wbh || imports.commandModule.perms || imports.commandModule.bot_perms)) resolve(imports.message.channel.send("Error code 1."));

        if (imports.message.guild) {

          if (await imports.commandModule.perms) {
            let permits = await imports.commandModule.perms.filter((perm) => { return !imports.message.member.hasPermission(perm) });
            if (await permits.length) resolve(imports.message.channel.send("Error code 2."));
          }

          if (await imports.commandModule.bot_perms) {
            let permits = await imports.commandModule.bot_permissions.filter((perm) => { return !imports.message.guild.me.hasPermission(perm) });
            if (await permits.length) resolve(imports.message.channel.send("Error code 3."));
          }
          if (await imports.commandModule.wbh && await imports.message.guild.fetchWebhooks().then(wbh => wbh.length) > 10 - await imports.commandModule.wbh) resolve(imports.message.channel.send("Error code 4."));
        }
        if (await !imports.cooldowns.has(imports.commandModule.name)) {
          await imports.cooldowns.set(imports.commandModule.name, new Discord.Collection());
        }
        imports.requestCachedAt = await Date.now();
        imports.timestamps = await imports.cooldowns.get(imports.commandModule.name)

        imports.cooldown = await (imports.commandModule.cooldown || 5) * 1000;
        imports.timeLeft = await (imports.cooldown - imports.requestCachedAt) / 60000;

        if (await imports.timestamps.has(imports.message.author.id) && await imports.requestCachedAt < imports.timeLeft) resolve(imports.message.channel.send("Error code 5."));
        await imports.timestamps.set(imports.message.author.id, imports.requestCacheAt);

        setTimeout(() => {
          if (imports.timestamps.has(imports.message.author.id)) resolve(imports.timestamps.delete(imports.message.author.id));
          resolve(imports.message.channel.send("Error code 6."));
        }, imports.cooldown);

        imports.command = await imports.getCommand(imports.commandModule.name, { type: "command", client: imports.client });
        
        if (await !imports.command || !imports.command.run) resolve();

        imports.command.run(imports).catch(reject)

      })()
    } catch (e) {
      reject(e)
    }
  })
}
*/
function handleMessage(message) {
  if (!message.author) return;
  if (message.author.bot) return;

  require("./filter.js").run({db: db, message: message, Discord: Discord, client: client, ...built_ins, colors: colors })
  if (!message.content.startsWith(prefix)) return;


  var args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  if (!commandName) return;

  var commandModule = built_ins.getCommand(commandName, { type: "module" });
  if (!commandModule) return;
  if (commandModule.disabled && commandModule.disabled === true) return message.react("❌");
   if (message.guild) {
    if (message.guild.id !== "712195322230865994" && commandModule.category && commandModule.category.toLowerCase() === "nefomemes' coding bunker exclusive") return message.channel.send("Oops, that command is only available at Nefomemes' Coding Bunker. Use `mw!codingbunker` for more information.")
    if (commandModule.permissions) {

      const permits = commandModule.permissions.filter(function (value, index, arr) { return !message.member.hasPermission(value) });

      if (permits.length) return message.react("❌")

    }
    if (commandModule.bot_permissions) {

      const permits = commandModule.bot_permissions.filter(function (value, index, arr) { return !message.guild.me.hasPermission(value) });

      if (permits.length) return message.react("❌");

    }

    if (!message.channel.permissionsFor(client.user.id).has("SEND_MESSAGES") || !message.channel.permissionsFor(client.user.id).has("EMBED_LINKS") || !message.channel.permissionsFor(client.user.id).has("ATTACH_FILES")) returnmessage.react("❌")

    if (commandModule.webhooks && message.guild.fetchWebhooks().then(map => map.length) > 10 - commandModule[0].webhooks) return message.react("❌")

  }

  if (!message.guild && commandModule.guild && commandModule.guild === true || !message.guild && commandModule.permissions && commandModule.permissions || !message.guild && commandModule.bot_permissions && commandModule.bot_permissions || !message.guild && commandModule.webhooks) return message.react("❌")

  const command = built_ins.getCommand(commandModule.name, { type: "command", client: client });

  if (!command) return message.react("❌")



  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 5) * 1000;
  const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
  const timeLeft = (expirationTime - now) / 60000;

  if (timestamps.has(message.author.id) && now < expirationTime) {
    if (
      message.author.id === "665419057075585025" && message.content.toLowerCase().endsWith(" --debug")
    ) {
      args.pop();
    } else {
      return message.react("❌")
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => {
    if (timestamps.has(message.author.id)) {
      timestamps.delete(message.author.id);
    }}, cooldownAmount);

  var imports = {
    db: db,
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
  
    figlet: figlet,
 
    _: _,
 
    querystring: querystring,
    fetch: fetch,
    colors: colors,

  }

  try {
    if (!command.run) return imports.message.react("❌")
    command.run(imports).catch(err => {
      message.channel.send(`An error occured! ${err}`);
      console.error(err);
    });
  } catch (error) {

    message.channel.send(`An error occurred! ${error}`);
  } }
  
client.on("message", async (message) => {
    handleMessage(message);
});
client.on("messageUpdate", async (oldMessage, newMessage) => {
  handleMessage(newMessage);
});

client.login(process.env.DISCORD_TOKEN);
