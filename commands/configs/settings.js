module.exports = {
	desc: 'Update the server configurations in your server.',
	perms: 7
};
module.exports.run = async imports => {
	const guild = await imports.db.getDoc('guilds', imports.message.guild.id);
	switch (imports.args.shift().toLowerCase()) {
		case 'filter': {
			let option = imports.args.shift();
			if (!option)
				return imports.message.channel.send(
					'The badwords filter for this server is set to ' +
						(guild.filter || false)
				);
			switch (option.toLowerCase()) {
				case 'true':
					await imports.db.updateDoc('guilds', imports.message.guild.id, {
						$set: { filter: true }
					});
					break;
				case 'false':
					await imports.db.updateDoc('guilds', imports.message.guild.id, {
						$set: { filter: false }
					});
					break;
				default:
					return imports.message.channel.send(
						'`true` - Turn on the filter.\n `false` - Turn off the filter.'
					);
			}
			return imports.message.channel.send('Nicely done.');
		}
		case 'welcomechannel':
			return imports.message.channel.send("Sorry, sir. It's  not yet done.");

		case 'welcomemessage':
			if (!imports.args.length)
				return imports.message.channel.send(
					'The welcome message set is currently, "' +
						imports.trim(guild.welcomeMessage, 2000 - 40) +
						`"`
				);
			var content = imports.trim(imports.args.join(' '), 141);
			if (imports.args[0].toLowerCase() === '-none') content = null;
			await imports.db.updateDoc('guilds', imports.message.guild.id, {
				$set: { welcomeMessage: content }
			});
			return imports.message.react('✅');

		case 'welcomeembed': {
			let option = imports.args.shift();
			if (!option)
				return imports.message.channel.send(
					'The welcome embed for this server is set to: ' +
						(guild.welcomeEmbed || false)
				);
			switch (option.toLowerCase()) {
				case 'true':
					await imports.db.updateDoc('guilds', imports.message.guild.id, {
						$set: { welcomeEmbed: true }
					});
					break;
				case 'false':
					await imports.db.updateDoc('guilds', imports.message.guild.id, {
						$set: { welcomeEmbed: false }
					});
					break;
				default:
					return imports.message.channel.send(
						'`true` - Turn on the filter.\n `false` - Turn off the filter.'
					);
			}
			return imports.message.channel.send('Nicely done. Ez pz.');
		}
		default:
			return imports.message.channel.send(
				'Sorry, sir. This syntax is not yet available.'
			);
	}
};
