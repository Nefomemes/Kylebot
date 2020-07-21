const translate = require('@vitalets/google-translate-api');
const e = require('express');
module.exports = {
    name: "translate",
    run: async (imports) => {

 

        var langOne = imports.args.shift(), langTwo = imports.args.shift(), result;

        const langs = [ "auto", "af", "sq", "am", "ar", "hy", "az", "eu", "be", "bn", "bs", "bg", "ca", "ceb", "ny", "zh-CN", "zh-TW", "co", "hr", "cs", "da", "nl", "en", "eo", "et", "tl", "fi", "fr", "fy", "gl", "ka", "de", "el", "gu", "ht", "ha", "haw", "he", "iw", "hi", "hmn", "hu", "is", "ig", "id", "ga", "it", "ja", "jw", "kn", "kk", "km", "ko", "ku", "ky", "lo", "la", "lv", "lt", "lb", "mk", "mg", "ms", "ml", "mt", "mi", "mr", "mn", "my", "ne", "no", "ps", "fa", "pl", "pt", "pa", "ro", "ru", "sm", "gd", "sr", "st", "sn", "sd", "si", "sk", "sl", "so", "es", "su", "sw", "sv", "tg", "ta", "te", "th", "tr", "uk", "ur", "uz", "vi", "cy", "xh", "yi", "yo", "zu"];

        var embed = new imports.Discord.MessageEmbed()
        .setColor(imports.colors.BG_COLOR)
        .setTitle("Google Translate")
        .setAuthor("Powered by Google Translate (API provided by Vitalets though)", "https://i.imgur.com/h3RoHyp.png","https://www.npmjs.com/package/@vitalets/google-translate-api" )
        .setThumbnail()
        .addField(`Input`, `\`\`\`${imports.built_ins.avoidBreak(imports.args.join(" "))}\`\`\``, true)
        .setTimestamp()
        .setFooter(`Prefix: ${process.env.PREFIX} | ${imports.built_ins.getRandomFunfact()}`)

        if(!langs.includes(langOne)) return message.channel.send("Unable to get the first language. Maybe you misspell it?");
        if(!langs.includes(langTwo)) return message.channel.send("Unable to get the second language. Maybe you misspell it?");
        if(langTwo === "auto") return message.channel.send("You can't auto-detect the second language!");
        
      if(langOne === "auto") langOne = null;
    
        
      translate(imports.args.join(" "), {from: langOne, to: langTwo}).then(result => {
        translate(result.text, {from: langTwo, to: result.from.language.iso}).then(resultSecond => {
        function getPropaganda(str) {
            if(!str || str.constructor !== String)return;
            let propaganda = require("../assets/classified/translate.json").content.filter(function(value){
                return value.term.toLowerCase() === str.toLowerCase();
            });
          
            if(!propaganda.length || propanganda.length > 1) return;
            return propaganda[0];
        }
        
            if(getPropaganda(imports.args.join(" "))){
                embed = embed.addFields({name: "Output", value: `\`\`\`${imports.built_ins.avoidBreak(getPropaganda(imports.args.join(" ")).means)}\`\`\``, inline: true},
                                        {name: "Reverse translate (to make sure it still sounds the same as the input)", value: `\`\`\`${imports.args.join(" ")}\`\`\``, inline: true})
        
                if(getPropaganda(imports.args.join(" ")).cod && getPropaganda(imports.args.join(" ")).cod === true){
                    embed = embed.setImage("https://i.imgur.com/NqWlFJc.jpg");
                } else {
                    embed = embed.setImage("https://i.imgur.com/KjEm67O.jpg");
                }
                                    } else{
        embed = embed.addFields({name: "Output", value: `\`\`\`${imports.built_ins.avoidBreak(result.text)}\`\`\``, inline: true},
                                {name: "Reverse translate (to make sure it still sounds the same as the input)", value: `\`\`\`${imports.built_ins.avoidBreak(resultSecond.text)}\`\`\``, inline: true})
            }
                                if(result.from.value){
            embed = embed.addField("Did you mean:",  `\`\`\`${imports.built_ins.avoidBreak(result.from.value)}\`\`\``, true);
        }

        embed = embed.addFields({name: "Translated from", value: result.from.language.iso, inline: true},
                                {name: "Translated to", value: langTwo, inline: true})

imports.message.channel.send(embed);
});
  
});
   

        

    }
}