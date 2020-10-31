module.exports = async (guild) => {
	global.client.channels.cache
		.get(configs.logs)
		.send(`${guild.name} have kicked the bot. F for Nefomemes.`);
}
