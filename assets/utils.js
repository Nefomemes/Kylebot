const search = (value, item) => {
          return value.id && value.id === item || value.name && (value.name.toLowerCase().startsWith(item) || value.name.toLowerCase().endsWith(item) || value.name.split(item)[1]) || item.split(value.name)[1];
        };
module.exports = {
  trim: (string, max) => {
	  string = `${string}`;
    if (string.length <= max) return string;
    return `${string.slice(0, max - 3)}...`;
  },

  getFooter: (str) => {
    const funfact = require("./funfact.json");
    return `Prefix: ${configs.prefix} | ` + configs.status + " | "+ ( str || funfact[Math.floor(Math.random() * funfact.length)])

  },
  customSplit: (str, maxLength) => {
    if (str.length <= maxLength) return [str];
    var parts = str.match(new RegExp(".{1," + maxLength + "}", "g"));
    return parts;
  },
  getMemberFromMention: (mention, GuildMemberManager) => {

    if (!mention || !GuildMemberManager) return;
 mention = mention.toString();

    if (mention.startsWith("<@") && mention.endsWith(">")) {
      mention = mention.slice(2, -1);
      if (mention.startsWith("!")) {
        mention = mention.slice(1);
      }
    }
    try {
    return GuildMemberManager.fetch(mention).catch(e => null);
} catch {
    return;
}
  },
  getChannelFromMention: (mention, ChannelManager) => {

    if (!mention || !ChannelManager) return;
   mention = mention.toString();
    
    if (mention.startsWith("<#") && mention.endsWith(">")) mention = mention.slice(2, -1);
    try {
        if(ChannelManager.fetch){
   return ChannelManager.fetch(mention).catch(i => null);
        } else if(ChannelManager.resolve){
               return ChannelManager.resolve(mention)
        }
 
    } catch {
        return null;
    }
  },
  freshActivity: (client) => {
    var activities = require("./activities.json");
    let activity = activities[Math.floor(Math.random() * activities.length)];

    return client.user.setActivity(activity.content + ` | ${require("./configs.json").prefix}help`, { type: activity.type }).catch(error => console.error(error));
  },
  avoidBreak: (str) => {
    if (str.constructor !== String || !str) return;
    return str.split("```").join("`‎`‎`‎");
  },
  getItem: (collection, item, type) => {
    if (!collection) return;
    var items;
    try {
       items = require(`./items/${collection}s`);
      
  } catch (e){
	  console.error(e);
  	try {
  		items = require(`./items/${collection}s.json`);
  	} catch (e) {
		  console.error(e);
    return null;
  	}
    }
      if(type && type.toLowerCase() === "all") return items;
      item = (item || "default").toLowerCase();
      if (item === "default") {
        let result = items.filter((value) => {
          return value.default && value.default === true;
        })
        if (!result.length) return;
        return result[Math.floor(Math.random() * result.length)];
      } else {
        let result = items.find((i) => search(i, item))
    return result;
      }
  },
  getCommand: (str, commandCache) => {
    if (!str || !commandCache) return;
    return commandCache.get(str.toLowerCase()) || commandCache.find((command) => { return command.aliases && command.aliases.includes(str.toLowerCase()) });
  },
  getPage: (array, length, page) => {
    if (!array || array.constructor !== Array) return;
    if (!length || length.constructor !== Number) return;
    if (!page || page.constructor !== Number) return;
    page--;
    let l = length - 1;
    let start = 0 + (length * page);
    let end = l + (length * page);
    if (end >= array.length) {
      end = array.length - 1;
    }
    page++;
var pages_length = (array.length / length).toString().split(".");
if(pages_length[1]){
    pages_length = parseInt(pages_length[0]) + 1;
} else {
    pages_length = parseInt(pages_length[0])
}
if(pages_length <= 0) pages_length = 1;
    return { start: start, end: end, array:  array, length: length, page: page, pages: pages_length};
  },
  getUserFromMention: (mention, UserManager) => {
	async function run(){
    if (!mention ||!UserManager) return;
    mention =  `${mention}`


           if (mention.startsWith("<@") && mention.endsWith(">")) {
      mention = mention.slice(2, -1);
      if (mention.startsWith("!")) {
        mention = mention.slice(1);
      }
    }
  try {
  return UserManager.fetch().catch(e => e) ;
 } catch (e) {
     return console.error(e);
 }
 }
 return run().then(i => i);
  },
  errorEmbed: (error) => {
      
        const embed = new Discord.MessageEmbed()
    .setColor(colors.BG_COLOR)
    .setAuthor("Report Issue on GitHub", "https://raw.githubusercontent.com/Nefomemes/Kylebot/master/assets/GitHub-Mark-Light-120px-plus.png", "https://github.com/Nefomemes/Kylebot/issues/new")
    .setDescription("```" + built_ins.trim(require("util").inspect(error), 2048 - 6) + "```")
    .setFooter("Please make sure noone have ever posted a similar issue and please provide reproduction steps.", global.client.user.displayAvatarURL({dynamic: true, format: "png"}))
    .setTimestamp()
    .setTitle("An error occured!")
    return embed;
  },
  getEmojiFromMention: (mention, EmojiManager) => {
      if(!mention || !EmojiManager) return;
      mention = `${mention}`;
      
      mention = mention.match(/^<a?:(\w+):(\d+)>$/);
      if(!mention) return;
      return EmojiManager.resolve(mention[2]);
      },
      parseOptions: (o, opts) => {
        var rawArgv;
        if(typeof o === "string"){
        rawArgv = require("shell-quote").parse(o)
        }
	
        var argv = require("mri")(rawArgv, opts);
        for(let [key, value] of Object.entries(argv)){
          if(typeof value === "string"){
          if(value.toLowerCase() === "true"){
            argv[key] = true;
          } else if(value.toLowerCase() === "false"){
            argv[key] = false;
          }
          } 
        }

        return argv;
      },
      search: search
}

module.exports.getRandomFunfact = module.exports.getFooter;