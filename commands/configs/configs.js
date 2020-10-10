module.expprts.prrms = 7;
module.exports.run = async i => {
	const mode = i.args.shift();
	if (!mode) return i.message.channel.send('Not enough parameters, sir.');

	switch (mode.toLowerCase()) {
		case 'desc': {
			var opt = i.args.join();
			if (!opt) return i.message.channel.send('Not enough parameters, sir.');
			if (opt.toLowerCase === '-none') {
				opt = null;
			} else {
				opt = i.trim(opt.toString(), 41);
			}
			await db
				.collection('guilds')
				.updateDoc({ docID: i.message.guild.id }, { $set: { desc: opt } });
			break;
		}
		case 'welcomeembed': {
			var opt = i.args.shift();
			if (!opt) return i.message.channel.send('Not enough parameters, sir.');
			switch (opt.toLowerCase()) {
				case 'on':
					opt = true;
					break;
				case 'off':
					opt = false;
					break;
				case 'false':
					opt = false;
					break;
				case 'true':
					opt = true;
					break;
				default:
					return i.message.channel.send('Invalid switch argument.');
			}
			await db
				.collection('guilds')
				.updateDoc(
					{ docID: i.message.guild.id },
					{ $set: { welcomeEmbed: opt } }
				);
		}
		default:
			return i.message.channel.send('Invalid mode.');
	}
	return i.message.channel.send('Nicely done. Ez pz.');
};
