const supports = require("./mw/platform.json");

module.exports = async (i, callback) => {

    if (!i.argv.u)
    return i.message.channel.send(
        "Looks like you're searching for John Cena. Set the `u` option with the username of the player."
    );
if (!i.argv.p)
    return i.message.channel.send(
        "You haven't specified a platform to look for the player. Set the `p` option with the name of the platform."
    );

let platform = supports[i.argv.p];
if (!platform)
    return i.message.channel.send(
        "Platform doesn't exist or isn't supported yet. Try again."
    );
try  {
    i.player = await codAPI.MWstats(i.argv.u, platform);
    return i.message.channel.send("This player does not exist. Please try again.")
} catch {}
    if(!callback) return;
    return callback(i).catch(e => {
        return i.message.channel.send(i.errorEmbed(e))
    })
}