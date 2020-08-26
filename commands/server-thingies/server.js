module.exports = {
  name: "server",
  run: async (imports) => {
    const guild = imports.message.guild;
    if (!guild) {
      imports.args = ["server"];

      return imports.client.commands.get("help").execute(imports).catch(error => {
        imports.message.channel.send("An error occured! " + error);
      });
    }
    const guildDB = imports.db.getDoc('guilds', guild.id);



    
    for(let eb of embeds){
      let key = embeds.findIndex(eb);
      if(key && key === 0){
        eb = eb.setTitle(guild.name)
        .setAuthor(imports.client.user.username, imports.client.user.displayAvatarURL({ format: "png", dynamic: true }))
        .setThumbnail(guild.iconURL({ format: "png", dynamic: true }))
      } else if(key && key === (embeds.length - 1)) {

      }
    }
    imports.message.channel.send(embed);
  }
};
