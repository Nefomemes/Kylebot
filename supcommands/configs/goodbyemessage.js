const { GridFSBucket } = require("mongodb");

module.exports = {
	description: "Configure the message that will be sent when a member left.",
	docs: "https://github.com/Nefomemes/docs/blob/main/Kylebot/super-commands/configs.md#prefixconfigs-desc--description",
	run: async i => {
 
 if(i.argv.m){
	 
	if(i.argv.m.length > 500) return i.message.channel.send("To prevent abuse and to save database resources, we restrict message content to only 500 characters.");
	await db.collection("guilds").updateDoc({docID: i.message.guild.id}, {$set: {goodbyeMessage: i.argv.m}})
} else if(i.argv.rm && i.argv.rm === true){
	await db.collection("guilds").updateDoc({docID: i.message.guild.id}, {$unset: {goodbyeMessage: ""}});
} else {
	const guildDB = await db.collection("guilds").getDoc({docID: i.message.guild.id});
	return i.message.channel.send(
		`Current goodbye message: ${guildDB.goodbyeMessage|| "none"}
		
		To change the goodbye message, add the \`m\` option with the message you want to be sent.
		To get rid of it, set the \`rm\` option to true.
		`
		);
}
 
 
 
 
 return i.message.channel.send("Nicely done. Ez pz.");
 
 	
	}
}