module.exports = async (imports) => {
    if(!imports.args.length) return imports.message.channel.send("Arguments required, try again, yeah?");
    const query = imports.args[0].split(".").join("#").split("#");
    var location = query.shift();
    var selected_doc;
    var embed = new imports.Discord.MessageEmbed()
    .setColor(imports.colors.BG_COLOR)
    .setAuthor("Discord.js", "https://avatars0.githubusercontent.com/u/26492485?s=200&v=4", "https://discord.js.org/")
    .setThumbnaiL("https://raw.githubusercontent.com/discordjs/discord.js/master/docs/logo.svg")
    .setFooter(`Prefix: ${imports.prefix} | | ${imports.getRandomFunfact()}`)
    .setTimestamp();
var fields = [];
    const res = await imports.fetch("https://raw.githubusercontent.com/discordjs/discord.js/docs/master.json").then(i => i);
    const docs = await i.json();
if(!res.ok) return imports.message.channel.send(`Ugh, sir. We received error ${res.status} with message "${res.statusText}".`);
var values = [];
values.push(...imports.test.classes);
values.push(...imports.test.typedefs);

var selected_values = values.filter(i => i.name.toLowerCase().split(location.toLowerCase())[1]);
if(!selected_values.length) return imports.message.channel.send("Sorry, sir. Class / typedef not found.");
  

};