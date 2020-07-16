module.exports = {
  name: "supreme",
  execute(imports) {
    if (!imports.args.length) return message.channel.send("You must write anything!");

    var style = "classic";
    var rejected = false;
    if (imports.args[0].toLowerCase() === "--dark") {
      let deleteArgs = imports.args.shift();
      style = "dark";
      if (!imports.args[0]) {
        rejected = true;
      }
    } else if (imports.args[0].toLowerCase() === "--random") {
      let deleteArgs = imports.args.shift();
      const options = ["dark", "light", "classic"];
      style = options[Math.floor(Math.random() * options.length)];
      if (!imports.args[0]) {
        rejected = true;
      }
    } else if (imports.args[0].toLowerCase() === "--light") {
      let deleteArgs = imports.args.shift();
      style = "light";
      if (!imports.args[0]) {
        rejected = true;
      }
    } else if (imports.args[0].toLowerCase() === "--classic" || args[0].toLowerCase() === "--red") {
      let deleteArgs = imports.args.shift();
      style = "classic";
      if (!imports.args[0]) {
        rejected = true;
      }
    } else {
      rejected = true;
    }
    if (rejected === true)
      return imports.message.channel.send(
        "Invalid type. You can use: `--light`, `--dark`, or `--classic`."
      );

    var query = imports.querystring.stringify({ text: imports.args.join(" ") });
    var img;
    if (style === "classic") {
      img = `https://api.alexflipnote.dev/supreme?${query}`;
    } else {
      img = `https://api.alexflipnote.dev/supreme?${query}&${style}=true`;
      
    }
    let embed = new imports.Discord.MessageEmbed()
        .setColor(process.env.BG_COLOR)
        .setAuthor(
          "Powered by AlexFlipnote",
          "https://cdn.discordapp.com/avatars/86477779717066752/df6e48c177943d08cbc1d678c12e347e.webp?size=1024",
          "https://api.alexflipnote.dev/"
        )
        .setDescription(
          "Doesn't look like what you expect? Join [our support server](https://nefomemes.herokuapp.com/kylebot/support) and say it to us."
        )
        .setImage(img)
        .setTimestamp()
        .setFooter(
          `Prefix: ${process.env.PREFIX} | ${imports.getRandomFunfact()}`)
      imports.message.channel.send(embed);
  }
};
