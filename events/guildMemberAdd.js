module.exports = async (member) => {
try {
  const guildDB = await global.db.getDoc("guilds", member.guild.id);
  if(guildDB && guildDB.welcomeChannel && global.client.channels.fetch(guildDB.welcomeChannel)){
    

    const user = member.user;
    var embed = null, content = null;
    if(!user.bot && guildDB.welcomeEmbed && guildDB.welcomeEmbed === true){
    const userDB = await global.db.getDoc("users", member.user.id);
    embed = new global.Discord.MessageEmbed()
    .setColor(global.colors.BG_COLOR)
    .setAuthor(user.username, user.displayAvatarURL({format:"png", dynamic: true}))
    .setTitle("Joined the server")
    .setThumbnail(global.built_ins.getItem('emblem', userDB.emblem).assets[0].asset)
    .setImage(global.built_ins.getItem('playercard', userDB.playercard).assets[0].asset)
    .setTimestamp()
    .setFooter(`Prefix: ${global.configs.prefix} | ${global.built_ins.getRandomFunfact()}`)
    } 
    if(guildDB.welcomeMessage && guildDB.welcomeMessage !== null && guildDB.welcomeMessage.constructor === String){
      content = guildDB.welcomeMessage.split("${user}").join(`<@!${user.id}>`).split("${username}").join(user.username);
    }
    if(content || embed){
      client.channels.cache.get(guildDB.welcomeChannel).send(content, embed);
    }
  
  };
} catch(e){
    console.error(e);
}
}