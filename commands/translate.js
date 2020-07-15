module.exports = {
    name: "translate",
    category: "Information",
    description: "Translate something.",
    usage: "nefo!translate <lang-1> <lang-2> <text> The <lang-1> is the thing the text is from, use auto to auto-detect the language. \n The <lang-2> is the same, just, no auto-detect, of course. If you are confused on how to know the languages, [click here](https://github.com/vitalets/google-translate-api/blob/master/languages.js).",
    example: "nefo!translate en id Never Gonna Give You Up",
    
    cooldown: 30,
    execute(imports) {

 

        langOne = imports.args.shift();
        langTwo = imports.args.shift();

        const langs = [ "auto", "af", "sq", "am", "ar", "hy", "az", "eu", "be", "bn", "bs", "bg", "ca", "ceb", "ny", "zh-CN", "zh-TW", "co", "hr", "cs", "da", "nl", "en", "eo", "et", "tl", "fi", "fr", "fy", "gl", "ka", "de", "el", "gu", "ht", "ha", "haw", "he", "iw", "hi", "hmn", "hu", "is", "ig", "id", "ga", "it", "ja", "jw", "kn", "kk", "km", "ko", "ku", "ky", "lo", "la", "lv", "lt", "lb", "mk", "mg", "ms", "ml", "mt", "mi", "mr", "mn", "my", "ne", "no", "ps", "fa", "pl", "pt", "pa", "ro", "ru", "sm", "gd", "sr", "st", "sn", "sd", "si", "sk", "sl", "so", "es", "su", "sw", "sv", "tg", "ta", "te", "th", "tr", "uk", "ur", "uz", "vi", "cy", "xh", "yi", "yo", "zu"];

        var embed = new imports.Discord.MessageEmbed()
        .setColor(process.env.BG_COLOR)
        .setTitle("Google Translate")
        .setAuthor("Powered by Google Translate (API provided by Vitalets though)", "https://i.imgur.com/h3RoHyp.png","https://www.npmjs.com/package/@vitalets/google-translate-api" )
        .setThumbnail()
        .setTimestamp()
        .setFooter(`Prefix: ${process.env.PREFIX} | ${imports.getRandomFunfact()}`)
        if(!langs.includes(langOne)) return message.channel.send("Unable to get the first language. Maybe you misspell it?");
        if(!langs.includes(langTwo)) return message.channel.send("Unable to get the second language. Maybe you misspell it?");
        if(langTwo === "auto") return message.channel.send("You can't auto-detect the second language!");

        if(langOne === "auto"){
        
            translate(args.join(" "), {to: langTwo}).then(result => {
                
              
            });
        } else {
            translate(args.join(" "), {from: langOne, to: langTwo}).then(result => {
                translate(args.join(" "), {from: langOne, to: langTwo}).then(resultSecond => {
               
        });
          
    })
             

        }

    }
}