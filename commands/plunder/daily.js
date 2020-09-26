module.exports.run = async (imports) => {
	const user = await imports.db.collection("users").getDoc({docID: imports.message.author.id});
	const interval = user.dailyClaim;
	const remaining = 86400000 - (Date.now() - interval);
	if (interval && remaining > 0)
		return imports.message.channel.send(
			'Ugh, no. You already claimed it. Come back another day.'
		);
	imports.db.collection("users").updateDoc({docID: imports.message.author.id}, {
		$inc: { cp: 25 },
		$set: { dailyClaim: Date.now() }
	});
	return imports.message.channel.send(
		'You have claimed your daily dose of 25 COD points. Come back another day.'
	);
};
