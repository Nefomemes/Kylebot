const { response } = require("express");

module.exports = {
    name: "song",
    category: "Misc commmands",
    description:"Search for a song.",
    cooldown: 15,
    execute(
        message,
        args,
        client,
        fs,
        Canvas,
        getRandomFunfact,
        figlet,
        translate,
        Discord,
        fetch,
        querystring,
        xml2js,
        killtreaks_utils,
        got,
        FileType,
        sizeOf,
        trim,
        getMemberFromMention,
        probe,
        http,
        imagesize,
        timestamps,
        customSplit,

    ){
        async function sendSongInfo(id){
         
          const {meta, response} = await fetch(`https://api.genius.com/songs/${querystring.stringify({q: id}).slice(2)}?${querystring.stringify({access_token: process.env.GENIUS_ACCESS_TOKEN})}`).then(res => res.json())
            if(meta.status !== 200) return message.channel.send("An error " + meta.status + " occured! " + meta.message);
            if(!response.song) return message.channel.send("Uh, oh. There seems no song with that ID!");
          const song = response.song; 
          var embed = new Discord.MessageEmbed()
          .setColor("#7289da")
          .setTitle(song.full_title)
          .setURL(song.url)
          .setAuthor("Powered by Genius", "", "")
          .setThumbnail(song.header_image_url)
          .addFields({name: "ID", value: song.id},
          {name: "Lyrics owner ID", value: song.lyrics_owner_id, inline: true},
          {name: "Lyrics state", value: song.lyrics_state},
          {name: "Annotation count", value: song.annotation_count, inline: true},
          {name: "Unreviewed annotations", value: song.stats.unreviewed_annotations, inline: true}, 
          {name: "Total annotations", value: song.stats.unreviewed_annotations + song.annotation_count},
          {name: "Concurrents", value: song.stats.concurrents}, 
          {name: "Hot", value: song.stats.hot},
          {name: "Art image URL", value: `[Click here](${song.song_art_image_url})`},
          {name: "Main artist", value: song.primary_artist.name, inline: true}, 
          {name: "Main artist ID", value: song.primary_artist.id, inline: true}, 
          {name: "Main artist page", value: `[Click here](${song.primary_artist.url})`, inline: true})
          .setTimestamp()
          
       if(song.full_title.toLowerCase().startsWith("never gonna give you up") && song.primary_artist.name === "Rick Astley"){
              embed.addField("How many people have been rick rolled trough the page", song.stats.pageviews);
              embed.setFooter("Prefix: nefo! | Never gonna give you up, never gonna let you down.");
          } else {
              embed.addField("How many people have visited the page", song.stats.pageviews)
              embed.setFooter("Prefix: nefo! | " + getRandomFunfact(), "https://cdn.discordapp.com/avatars/675840311599300650/82ada90d0daf322dcea7bbbff92bee90.png")
          }

       return  message.channel.send(embed);
      }
            const search_query = args.join(" ") || "Never Gonna Give You Up";
            (async function(){
          if(parseInt(search_query)){
                sendSongInfo(search_query);
          }   else { 
                const {meta, response} = await fetch(`https://api.genius.com/search?${querystring.stringify({q: search_query})}&${querystring.stringify({access_token: process.env.GENIUS_ACCESS_TOKEN})}`).then(res => res.json())
                if(meta.status !== 200) return message.channel.send("An error happened! And it seems it is error " + meta.status + " with description `" + meta.message + "`.");
                    if(!response.hits)return message.channel.send("Umm, it seems there's no song for it..");
                if(!response.hits.length) return message.channel.send("Umm, it seems there's no song for it.");
                if(response.hits.length = 1){
          
                    sendSongInfo(response.hits[0].result.id);
            } else {
                var a = 0;
                var title = [];
                 var urls = [];
                 var id = [];
                var list = [];
                 do {    
                     title[a] = response.hits[a].result.full_title;
                     urls[a] = response.hits[a].result.url;
                     id[a] = response.hits[a].result.id;
                     list[a] = `[${title[a]}](${urls[a]}) (ID: ${id[a]})`;
                     a++;
                 } while( a < response.hits.length)
 
                 var embed = new Discord.MessageEmbed()
                 .setColor("#7289da")
                 .setTitle("Search results for " + args.join(" "))
                 .setAuthor("Powered by Genius", "")
                 .setDescription(list.join("\n"))
                 .setFooter("Prefix: nefo! | " + getRandomFunfact(), "https://cdn.discordapp.com/avatars/675840311599300650/82ada90d0daf322dcea7bbbff92bee90.png")
 
                 message.channel.send(embed);
                 
                
            
            
            }}
            })()

    }
}