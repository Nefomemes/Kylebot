
module.exports.desc = "For messing around with argv.";
module.exports = {
    run: async (i) => {
	    i.message.channel.send("```" + __.trim(__.struction(i.args.join(" ")), 2000 - 6) + "```")
     return i.message.channel.send("```js\n" + __.trim(__.struction(util.inspect(i.argv)), 2000 - 6) + "\n```");
    }
}