
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
const branding = require("./assets/configs/configs");
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
client.commands.cache = new Discord.Collection();

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

var imports = {
  db: db,
  ...built_ins,
  ...branding,
  client: client,
  Discord: Discord,
  probe: probe,
  figlet: figlet,
  got: got,
  _: _,
  querystring: querystring,
  fetch: fetch,
  colors: colors,
  opt: {},
  cooldowns: cooldowns
}

function handleMessage(message) {
  return new Promise((resolve, reject) => {
    try {
      (async function () {
        if (await (!message.author || message.author.bot)) resolve();
        imports.message = await message;
        await require("./filter").run(imports).catch(reject);
        if (await !imports.message.content.startsWith(imports.prefix)) resolve();
        imports.args = await imports.message.content.slice(imports.prefix.length).split(/ +/);
        imports.commandName = await imports.args.shift().toLowerCase();
        if (await !imports.commandName) resolve();
        imports.commandModule = built_ins.getCommand(commandName, { type: "module" });

        if (await !imports.commandModule || imports.commandModule.disabled && imports.commandModule.disabled === true) resolve();
        if (await !imports.message.guild && (imports.commandModule.av && (imports.commandModule.av === "guild") || imports.commandModule.wbh || imports.commandModule.perms || imports.commandModule.bot_perms)) resolve();

        if (await imports.message.guild) {

          if (await imports.commandModule.perms) {
            let permits = await imports.commandModule.perms.filter((perm) => { return !imports.message.member.hasPermission(perm) });
            if (await permits.length) resolve();
          }

          if (await imports.commandModule.bot_perms) {
            let permits = await imports.commandModule.bot_permissions.filter((perm) => { return !imports.message.guild.me.hasPermission(perm) });
            if (await permits.length) resolve();
          }
          if (await imports.commandModule.wbh && await imports.message.guild.fetchWebhooks().then(wbh => wbh.length) > 10 - await imports.commandModule.wbh) resolve();
        }
        if (await !imports.cooldowns.has(imports.commandModule.name)) {
          await imports.cooldowns.set(imports.commandModule.name, new Discord.Collection());
        }
        imports.requestCachedAt = await Date.now();
        imports.timestamps = await imports.cooldowns.get(imports.commandModule.name)

        imports.cooldown = await (imports.commandModule.cooldown || 5) * 1000;
        imports.timeLeft = await (imports.cooldown - imports.requestCachedAt) / 60000;

        if (await imports.timestamps.has(imports.message.author.id) && await imports.requestCachedAt < imports.timeLeft) resolve();
        await imports.timestamps.set(imports.message.author.id, imports.requestCacheAt);

        setTimeout(() => {
          if (imports.timestamps.has(imports.message.author.id)) resolve(imports.timestamps.delete(imports.message.author.id));
          resolve();
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
client.on("message", handleMessage);
client.on("messageUpdate", async (oldMessage, newMessage) => {
  handleMessage(newMessage);
});

client.login(process.env.DISCORD_TOKEN);
