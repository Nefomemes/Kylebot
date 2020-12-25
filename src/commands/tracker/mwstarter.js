const supports = require("./mw/platform.json");

module.exports = async (i, callback) => {

    if(!i.argv.u)
    return i.message.channel.send(
        "Looks like you're searching for John Cena. Set the `-u`  or `--username` option with the username of the player."
    );


    if(!i.argv.s) return i.message.channel.send(
        "You haven't specified a platform to look for the player. Set the `-s` or `--platform` option with the name of the platform."
    );
if(typeof i.argv.u !== "string") return i.message.channel.send("The username must be in a string format!");
if(typeof i.argv.u !== "string") return i.message.channel.send("The platform must be in a string format!");

let platform = supports[(i.argv.s).toLowerCase()];
if (!platform)
    return i.message.channel.send(
        "Platform doesn't exist or isn't supported yet. Try again."
    );
try  {
    i.player = await codAPI.MWstats(i.argv.u, platform);
    
} catch {
	return i.message.channel.send("This player does not exist. Please try again.");
}
    if(!callback) return;
    return callback(i).catch(e => {
    	console.error(e);
        return i.message.channel.send(i.errorEmbed(e))
    })
}