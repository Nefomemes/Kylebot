const { GridFSBucket } = require("mongodb");

module.exports = {
	description: "Configure the message that will be sent when a member left.",
	docs: "https://github.com/Nefomemes/docs/blob/main/Kylebot/super-commands/configs.md#prefixconfigs-desc--description",
	run: async i => {
 
 if(i.argv.message){
	 
	if(i.argv.message.length > 500) return i.message.channel.send("To prevent abuse and to save database resources, we restrict message content to only 500 characters.");
	await db.collection("guilds").updateDoc({docID: i.message.guild.id}, {$set: {goodbyeMessage: i.argv.message}})
} else if(i.argv.remove_message && i.argv.remove_message === true){
	await db.collection("guilds").updateDoc({docID: i.message.guild.id}, {$unset: {goodbyeMessage: ""}});
} else {
	const guildDB = await db.collection("guilds").getDoc({docID: i.message.guild.id});
	return i.message.channel.send(
		`Current goodbye message: ${guildDB.goodbyeMessage|| "none"}
		
		To change the goodbye message, add the \`message\` option with the message you want to be sent.
		To get rid of it, add the \`remove_message\` option like this, \`--remove_message\`.
		`
		);
}
 
 
 
 
 return i.message.channel.send("Nicely done. Ez pz.");
 
 	
	}
}