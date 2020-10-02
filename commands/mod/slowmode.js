module.exports.run = async i => {
	
	var args = require("minimist")(i.args);
var channel = i.getChannelFromMention(args.channel) || i.message.channel;

	if (!channel) return i.message.channel.send('Invalid channel.');
	if (channel.type !== 'text')
		return i.message.channel.send(
			'Slowmode only works in text channels.')


	if (!channel.permissionsFor(i.message.author.id).has('MANAGE_CHANNELS') && !client.owners.cache.get(i.message.author.id))
		return i.message.channel.send(
			'You need to be able to manage this channel before proceeding, sir.'
		);
 if(!channel.manageable) return i.message.channel.send("Sorry, sir. I am missing permissions to set the channel's slowmode.");

	if(!args.slowmode)
		return i.message.channel.send(
			'Add `-slowmode <slowmode>` or `--slowmode=<slowmode>` to specify how long the slowmode should be.'
		);
	if(Number.isNaN(parseInt(args.slowmode))) return i.message.channel.send('The slowmode argument must be a number and is in seconds.');
	
	if (args.slowmode > (6 * 3600))
		return i.message.channel.send(
			'Slowmode may not be longer than 6 hours (3600 seconds). Try again.'
		);
	await channel.setRateLimitPerUser(
		args.slowmode,
		`Reason: ${args.reason || 'unknown'} AdminID: ${
			imports.message.author.id
		} AdminUsername: ${imports.message.author.username}#${
			imports.message.author.discriminator
		}`
	);
	return imports.message.channel.send('Nicely done. Ez pz.');
};
module.exports.av = 'guild';
