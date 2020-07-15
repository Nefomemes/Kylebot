module.exports = {
  name: "search",
  description: "Search something in the Internet. Returns in the link though.",
  permsreq: [],
  category: "Misc Commands",
  apiUsed: ["Discord"],
  usage: "nefo!search <arg>",
  explanation: "None",
  example: "nefo!search Never Gonna Give You Up",
  cooldown: 5,
  execute(imports) {
    if(!imports.args.length) return imports.message.channel.send("What you want to search, huh?");
    const embed = new imports.Discord.MessageEmbed()
    .setColor(process.env.BG_COLOR)
    .setTitle("Search results for " + imports.args.join(" "))
    .setAuthor(imports.client.user.username, imports.client.user.displayAvatarURL({format: "png", dynamic: true}))
    .setDescription("Here are some quick search link for you.\n\n" + 
                    `[Google Search](https://www.google.com/search?${imports.querystring.stringify({q: imports.args.join(" ")})}&safe=strict)\n`+
                    `[Bing Search](https://www.bing.com/search?${imports.querystring.stringify({q: imports.args.join(" ")})}&safe=strict)\n`+ 
                    `[Duck Duck Go](https://duckduckgo.com/?${imports.querystring.stringify({q: imports.args.join(" ")})}&safe=strict)\n` +
                    `[Twitter](https://twitter.com/search?${imports.querystring.stringify({q: imports.args.join(" ")})}&safe=strict)\n`+
                    `[Youtube](https://www.youtube.com/results?${imports.querystring.stringify({search_query: imports.args.join(" ")})}&safe=strict) \n` +
                    `[Stackoverflow](https://stackoverflow.com/search?q=${imports.querystring.stringify({q: imports.args.join(" ")})}&safe=strict)\n` +
                    `[Wikihow](https://www.wikihow.com/wikiHowTo?${imports.querystring.stringify({search: imports.args.join(" ")})}&safe=strict)\n` +
                    `[Node Package Manager](https://www.npmjs.com/search?${imports.querystring.stringify({q: imports.args.join(" ")})}&safe=strict)\n` +
                    `[GitHub](https://github.com/search?${imports.querystring.stringify({q: imports.args.join(" ")})}&safe=strict)\n`+
                    `[Fandom](https://www.fandom.com/?${imports.querystring.stringify({s: imports.args.join(" ")})}&safe=strict)`)
  
  .setTimestamp()
  .setFooter(`Prefix: ${process.env.PREFIX} | ${imports.getRandomFunfact()}`)
    imports.message.channel.send(embed);
                  }
};
