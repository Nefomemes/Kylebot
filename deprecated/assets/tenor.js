module.exports = {
  name: "tenor",
  category: "Utility",
  description: "Get a random GIFs from Tenor.",
  apiUsed: ["Discord", "Tenor"],
  usage: "nefo!tenor <keyword>",
  explanation: "none",
  example: "nefo!tenor Rick Roll",
  permsreq: [],
  cooldown: 15,
  execute(imports) {
   return message.channel.send("Sorry, this command is being recoded.")

   
  }
};
