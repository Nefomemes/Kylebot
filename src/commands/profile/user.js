module.exports = {
  name: "user",
  run: async (i) => {
    var user, member, userDB;
 user  = await i.getUserFromMention(i.argv.u, i.client.users) || i.message.author;
 if(i.message.guild){
     member = await i.getMemberFromMention(user.id, i.message.guild.members);
     
 }
 

var embed = new Discord.MessageEmbed()
      .setColor(colors.BG_COLOR)
      .setTitle(`${user.username}#${user.discriminator}`)
      .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }), i.website)
      .setThumbnail(user.displayAvatarURL({ format: "png", dynamic: true }))
      .setFooter(`Prefix: ${i.prefix} | ${__.getFooter()}`, client.user.displayAvatarURL({ format: "png", dynamic: true })).setTimestamp()

var pages = [];

if(!user.bot){
	const userDB = await db.collection("users").getDoc({docID: i.message.author.id});
	pages.push(`
	${__.trim(userDB.desc, 141)}
	**COD points**: ${userDB.cp || 0} <:cp:744403130594230313>
	**Plunder cash**: $${userDB.cash || 0}
	`)
}
var o = (key, value) => {
	switch(value){
		case "offline":
		return `<:Kylebot_Online:772398116766482434> Offline`

		case "idle":

		return `<:Kylebot_Idle:772398116921409547> Idle`

		case "dnd":

		return `<:Kylebot_DND:772398936295866370> Do not disturb`

		case "online":

		if(key === "mobile"){
			return `<:Kylebot_Mobile_Online:772398116716150796> Online`
		} else {
			return `<:Kylebot_Online:772398117260754944> Online`
		}
	}
}
pages.push(`
**Presence**: 
${Object.entries(user.presence.clientStatus).map((client) => (() => {return client[0][0].toUpperCase() + client[0].slice(1);})() + ": " + o(client[0], client[1])).join("\n")}
**ID**: ${user.id}
**Username**: ${user.username}#${user.discriminator}
**Account type**: ${(() => { 
	if(user.bot){
		return "This user is a bot."
	} else {
		return "This user is not a bot."
	}

})()}
`)

	i.argv.p = parseInt(i.argv.p);
	if(Number.isNaN(i.argv.p)){
		i.argv.p = 1;
	}
	embed = embed.setDescription(pages[i.argv.p - 1] || "Uh oh, the page doesn't exist.");
	embed = embed.setFooter(`Page ${i.argv.p}/${pages.length} | ${embed.footer.text}`, embed.footer.iconURL);
       return i.message.channel.send(embed);
    i.message.channel.send(embed);
  }
};
