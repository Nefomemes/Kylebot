const supports = require("./mw/platform.json");

module.exports = async (i, callback) => {

    if (!i.argv.user)
    return i.message.channel.send(
        "Looks like you're searching for John Cena. Set the `user` option with the username of the player."
    );
if (!i.argv.p)
    return i.message.channel.send(
        "You haven't specified a platform to look for the player. Set the `p` option with the name of the platform."
    );

i.argv.platform = supports[i.argv.p];
if (!i.argv.platform)
    return i.message.channel.send(
        "Platform doesn't exist or isn't supported yet. Try again."
    );

    i.player = await codAPI.MWstats(i.argv.user, i.argv.p);
    if(!callback) return;
    return callback(i).catch(e => {
        return i.message.channel.send(i.errorEmbed(e))
    })
}