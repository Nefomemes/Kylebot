module.exports = {
	"category":"bot",
	"aliases":["ping"],
run: async (i) => {
 
   
        const uptime = client.uptime /3600000;
        var embed = new Discord.MessageEmbed()
          .setColor(colors.BG_COLOR)
          .setTitle(client.user.username)
          .setAuthor(client.user.username, client.user.displayAvatarURL({format: "png", dynamic: true})
          )
          .setThumbnail(
           client.user.displayAvatarURL({format: "png", dynamic: true})
          )
          .setTimestamp()
          .setFooter(i.getFooter(),   client.user.displayAvatarURL({format: "png", dynamic: true})
          );
	var pages = [
		`
		**Username**: ${client.user.username}#${client.user.discriminator}
		**Discord Gateway API latency**: ${client.ws.ping}ms
		**Online since**: ${new Date(client.readyAt).toUTCString()}
		**Users cached**: ${client.users.cache.size} users
		**Servers cached**: ${client.users.cache.size} servers`
	]
	i.argv.p = parseInt(i.argv.p);
	if(Number.isNaN(i.argv.p)){
		i.argv.p = 1;
	}

	
	embed = embed.setDescription(pages[i.argv.p - 1] || "Uh oh, the page doesn't exist.");
	embed = embed.setFooter(`Page ${i.argv.p}/${pages.length} | ${embed.footer.text}`, embed.footer.iconURL);
       return i.message.channel.send(embed);
        

  }
}