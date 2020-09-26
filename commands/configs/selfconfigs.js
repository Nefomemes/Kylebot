module.exports.run = async i => {
	const mode = i.args.shift();
	if (!mode) return i.message.channel.send('Not enough parameters, sir.');

	switch (mode.toLowerCase()) {
		case 'desc':
			var opt = i.args.join();
			if (!opt) return i.message.channel.send('Not enough parameters, sir.');
			
			if (opt.toLowerCase === '-none'){
			    opt = null;
			} else {
			    opt = imports.trim(opt.toString(), 141);
			}
			await i.db
				.collection('users')
				.updateDoc({ docID: i.message.author.id }, { $set: { desc: opt } });
			break;
		default:
			return i.message.channel.send('Invalid mode.');
	}
	return i.message.channel.send('Nicely done. Ez pz.');
};
