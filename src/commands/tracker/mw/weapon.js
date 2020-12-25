const mwstarter = require("../mwstarter");

const weapons = require(path.join(process.__maindir, "assets", "weapons.json"));
module.exports = {
    desc: 'Get the information of a Call of Duty: Modern Warfare player.',
    argvOptions: {
		u: [ "user" ],
		s: [ "platform" ],
		m: [ "mode" ]
	},
    docs: "https://github.com/Nefomemes/docs/blob/main/Kylebot/super-commands/mw.md#prefixmw-mode-option-",
    run: async (i) => mwstarter(i,  async i => {

        if (typeof i.player === 'string') return i.message.channel.send('Message: ' + i);
        var embed = new Discord.MessageEmbed()
            .setColor(colors.BG_COLOR)
            .setAuthor(
                'Call of Duty™: Modern Warfare™',
                'https://i.imgur.com/HMU8AmJ.png'
            )
            .setThumbnail('https://i.imgur.com/HMU8AmJ.png')
            .setTitle(i.player.username)
            .setFooter(
                i.getRandomFunfact(),
                client.user.displayAvatarURL({ format: 'png', dynamic: true })
            );
        var fields = [];
        var k = 6;
        var weaponStats = {};
        _.each(i.player.lifetime.itemData, (value, key) => {
            if (!key.startsWith("weapon_")) return;
            return _.each(value, (v, k) => {
                return weaponStats[k] = v;
            })
        })
        if (i.argv.w) {

            var weapon;
            if (weaponStats[i.argv.w] || weaponStats[i.argv.w.slice("weapon_").length] || weaponStats["iw8_" + i.argv.w]) {
                weapon = i.argv.w
            } else {
             
                let foobar = [];
                for (const [key, value] of Object.entries(weapons)) {
                    if(value.toLowerCase() === i.argv.w.toLowerCase() || value.toLowerCase().split(i.argv.w.toLowerCase())[1]){
                        foobar.push({ key: key, value: value });
                    }

                }
        
                if (!foobar.length) return i.message.channel.send("There are no gun with that name or id.");
                weapon = foobar[0].key;
                
            }
            if (!weaponStats[weapon]) return i.message.channel.send("There are no weapons with that name or id.");
            embed = embed.setImage(`https://www.callofduty.com/cdn/app/weapons/mw/icon_cac_weapon_${weapon.slice(4)}.png`)
                .setTitle(`${weapons[weapon] || weapon} stats for ${embed.title}`)
            _.each(weaponStats[weapon].properties, (value, key) => {
                return embed.addField(key, value);
            })
        } else {
            k = 4;
            _.each(weaponStats, (v, k) => {
                embed.addField( weapons[k] || k, i.trim(`**Kills**: ${v.properties.kills} kills\n**Deaths**: ${v.properties.deaths} deaths\n**KD ratio**: ${v.properties.kdRatio}\n**Shots**:${v.properties.shots} shots\n**Hits**:${v.properties.hits} hits\n**Accuracy**:${v.properties.accuracy}`, 1024), true )
            })

        }


      embed = i.embedPagify(embed,
      {
	      page: i.argv.p,
	      length: i.argv.l,
      })
        return i.message.channel.send(embed);

})
};
