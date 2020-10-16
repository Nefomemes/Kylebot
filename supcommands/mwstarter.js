const supports = require("./mw/platform.json");

module.exports = async (i, callback) => {

    if (!i.argv.player)
    return i.message.channel.send(
        "Looks like you're searching for John Cena. Add `--player=<gamertag>` or `-player <gamertag>` to look fo their stats."
    );
if (!i.argv.platform)
    return i.message.channel.send(
        "You haven't specified a platform to look for the player. Add `--platform=<platform>` or `-platform <platform>`."
    );

i.argv.platform = supports[i.argv.platform];
if (!i.argv.platform)
    return i.message.channel.send(
        "Platform doesn't exist or isn't supported yet. Try again."
    );

    i.player = await codAPI.MWstats(i.argv.player, i.argv.platform);
    if(!callback) return;
    return callback(i).catch(e => {
        return i.message.channel.send(i.errorEmbed(e))
    })
}