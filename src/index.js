(async function(){

process.on('unhandledRejection', function(reason, promise) {
	console.error('Unhandled rejection', { reason: reason, promise: promise });
});

process.on('uncaughtException', err => {
	console.error('There was an uncaught error', err);
	process.exit(1); //mandatory (as per the Node docs)
});
global.path = require('path');
process.__maindir = __dirname;
global.fs = require('fs').promises;

global.__ = await require("./handlers/registerUtils")();

global.colors = require('./assets/color.json');

global.quickdb = require("quick.db");
global.Discord = require('discord.js');

global._ = require('lodash');
global.util = require('util');
const client = new global.Discord.Client({
	partials: ['REACTION', 'MESSAGE'],
	ws: {
		intents: [
			'GUILDS',
			'GUILD_PRESENCES',
			'GUILD_MESSAGES',
			'DIRECT_MESSAGES',
			'GUILD_MESSAGE_REACTIONS',
			'DIRECT_MESSAGE_REACTIONS',
			'GUILD_MEMBERS',
			'GUILD_PRESENCES'
		]
	}
});
global.client = client;
global.configs = require('./assets/configs.json');
configs.prefix = process.env.PREFIX || configs.prefix;
global.xml2js = require('xml2js');
global.querystring = require('querystring');
global.fetch = require('node-fetch');
const { mongodb } = require('node-grau');
global.process_argv = require("mri")(process.argv);
const { MongoClient } = mongodb;
const db = new MongoClient(process.env.DB);

(async function() {
	await db.connect();
	console.log('Connected with database.');
	global.db = db.db('bot');
})();
global.codAPI = require("call-of-duty-api")()
codAPI.login(process.env.COD_EMAIL, process.env.COD_PASSWORD);
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

global.express = require('express');
const app = global.express();


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Gaz is closing in. PORT ${PORT}`);
	require('./req-handler.js').execute({ app: app });
});

client.once('ready', () => {
	console.log('Gaz is inbound');

	global.configs.owners.forEach(owner => {
		if (!owner) return;
		const user = client.users.fetch(owner.toString());
		if (!user) return;
		return client.owners.cache.set(owner, user);
	});

__.refreshActivity(client);

});
client.on('ready', () => {
	setInterval(() => {
		__.refreshActivity(client);
	}, 150000);
});
client.on('error', err => {
	console.err(err);
});
try

await require("./handlers/registerEvents")();

await require("./handlers/registerCommands")();

 } catch(e) {
	 console.warn(e);
 }



client.login();
})()