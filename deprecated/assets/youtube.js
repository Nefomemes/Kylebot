module.exports = {
    name: "youtube",
    category: "Misc commands",
    description: "Search or get the info of a  youtube video.",
    usage: "nefo!youtube <query>",
    example: "nefo!youtube Never Gonna Give You Up",
    execute( message,
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
        customSplit){
            return message.channel.send("<a:Unknown:709741696153419776> This command is not yet available!");
            var q, mode;
            if(!args.length){
                q = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
            } else {
                q = args.join(" ");
            }  
            if(q.startsWith("https://www.youtube.com/watch?v=")){       
            q = q.slice(32).split("&")[0];
            mode = "id";
        }else if(q.startsWith("http://www.youtube.com/watch?v=")) {
            q = q.slice(31).split("&")[0];
            mode = "id";
        } else if(q.startsWith("https://youtu.be/")){
            q = q.slice(17).split("?")[0];
            mode = "id";
        } else if( q.startsWith("http://youtu.be/")){
            q = q.slice(16).split("?")[0];
            mode = "id";
        } else {
            mode = "search";
        }
        
        if(mode === "id"){
            (async function(){
 
            })
        }

        } 
}