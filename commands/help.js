

const commandList = require("../assets/cmd-list.json").content;
module.exports = {
  name: "help",

  execute(imports
  ) {

    const pages = [
      /* Page 1 */ "Here are all the list of categories available here.\n\n If you want to see a detailed look at one of these commands. Just send `nefo!help <command>`. Do not actually put the `[]` " +
        `though because the bot will be confused.\n\nIf you want to join the bot's support server, [click here.](https://discord.gg/uBE8Sbh)\n\n__**Categories**__\n**Just simply use ` +
        "`nefo!help [page-number]`" +
        `**\n1️⃣ - Home page\n2️⃣ - Bot Information\n3️⃣ - Discord Information\n4️⃣ - GIFs\n5️⃣ - Mematic\n6️⃣ - Moderation\n7️⃣ - Misc commands \n8️⃣ - Developer`,
      /* Page 2 */ "__**Bot**__\n**Every important information about the bot.**\n`botinfo`, `bug`, and `suggest`.",
      /* Page 3 */ "__**Discord Information**__\n**Some great infos.**\n`user` ,`server`, `channel`, `perms`, `role`, and `emoji`.",
      /* Page 4 */ "__**GIFs**__\n**GIFs! No anime though.**\n`betray`, `kill`, `happy`, and `respect`, `nuke`, `ac130`, and `precstrike`.",
      /* Page 5 */ "__**Mematic**__\n**The fastest and easiest way to make memes!**\n`noanime`, `nokpop`, `textimg`, and `resize`",
      /* Page 6 */ "__**Moderation**__\n**Some commands that are required to keep your servers safe.**\n`adminnuke`, `ban`, and `kick`",
      /* Page 7 */ "__**Misc Commands**__\n**Commands that doesn't fit anywhere else yet.** \n `say`, `wttr`, `randomufo`, `blogger`, `tenor`, `supreme`, `steamuser`,`search`, `encode`, and `querify`. ",
      /* Page 8 */ "__**Developer**__\n**Some commands that only the owner can use it.**\n`setactivity` and `eval`."
    ];
    var page = new imports.Discord.MessageEmbed()
      .setColor(process.env.BG_COLOR)
      .setTitle("Kyle Help Page")
   
      .setAuthor(
        "Kyle \"Gaz\"Garrick",
       imports.client.user.displayAvatarURL({format: "png", dynamic: true})
      )
      .setThumbnail(
        imports.client.user.displayAvatarURL({format: "png", dynamic: true})
      )
      .setTimestamp()
      .setFooter(
        `Prefix: ${process.env.PREFIX} | Due to some heavy rewrite to the command handler. Only some commands available. Please wait until the rewrite process completed. `,
        imports.client.user.displayAvatarURL({format: "png", dynamic: true})
      );

    if (!imports.args.length) {
      description = pages[0]
    
    } else if (parseInt(imports.args[0]) - 1 <= pages.length) {
      description = pages[parseInt(imports.args[0]) - 1]
    } else {
      const commandName = imports.args[0].toLowerCase();
      const commandModule = commandList.filter(function(value, index, arr){ return value.name === commandName || value.aliases && value.aliases.includes(commandName)});
      if(!commandModule.length) return imports.message.channel.send("It seems there is no command for **`" + commandName +"`**.")
      if(commandModule.length > 1) return imports.message.channel.send("It seems there is multiple instances of that command. Please try again later.");
      
      var description;
      Object.keys(commandModule[0]).forEach(rawKey => {
        const capitalize = (s) => {
          if (typeof s !== 'string') return ''
          return s.charAt(0).toUpperCase() + s.slice(1)
        }
        let value = commandModule[0][rawKey];
        let key = capitalize(rawKey);
        if(Array.isArray(value)) value = value.join("\n");
        let format =`**${key}**\n${value}\n`;
        if(!description){
          description = format;
        } else {
          description = description + format;
        }
        
    });
    }
    page.setDescription(imports.trim(description, 2048))
      imports.message.channel.send(page);
  }
};
