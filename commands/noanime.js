
module.exports = {
  name: "noanime",
  execute(imports) {

      function customArrayRemove(arr, value) {
        return arr.filter(function(ele) {
          return ele.toLowerCase() != value || !ele.toLowerCase().startsWith(arr) || !ele.toLowerCase().endsWith(arr);
        });
      }

   

      const user = imports.getMemberFromMention(imports.args.shift(), imports.message);
      if (!user) return imports.message.channel.send("You must mention somebody!");
      const idk = imports.args.shift();
      if (!idk)
        return imports.message.channel.send(
          "Invalid usage! You can't just give someone a no anime ticket for no reason!"
        );
      if (imports.getMemberFromMention(idk))
        return imports.message.channel.send("One person at a time, please.");
      if (idk !== "|")
        return imports.message.channel.send("Add `|` after the mention please.");

      const form = imports.args.join(" ").split(" | ");
      if (!form[1] && !form[2])
        return imports.message.channel.send(
          "Invalid usage. Check the help command."
        );
      var reasons = form.shift().split(", ");
      const dedicatedReasons = ["anime meme","anime game",
        "anime girl",
        "manga",
        "hentai",
        "trap",
        "uwu speech",
        "weeb music"
      ];

    
   
       async function renderImage(){
        
            const canvas = imports.Canvas.createCanvas(1280, 853);
            const ctx = canvas.getContext("2d");
        
            const ticket = await imports.Canvas.loadImage(
              "https://i.imgur.com/C40REWg.jpg"
            );
            ctx.drawImage(ticket, 0, 0, canvas.width, canvas.height);
       
            ctx.font = `33px arial`;
            ctx.fillStyle = "#000000";

            if (
              reasons.find(
                element => element.toLowerCase().startsWith(dedicatedReasons[0])
              )
            ) {
              
              ctx.fillText("X", 41, 370);
              reasons = customArrayRemove(reasons, dedicatedReasons[0]);
            }
            if (
              reasons.find(
                element => element.toLowerCase().startsWith(dedicatedReasons[1])
              )
            ) {
              ctx.fillText("X", 345, 370);
              reasons = customArrayRemove(reasons, dedicatedReasons[1]);
            }
            if (
              reasons.find(
                element => element.toLowerCase().startsWith(dedicatedReasons[2])
              )
            ) {
              ctx.fillText("X", 650, 370);
              reasons = customArrayRemove(reasons, dedicatedReasons[2]);
            }
            if (
              reasons.find(
                element => element.toLowerCase().startsWith(dedicatedReasons[3])
              )
            ) {
              ctx.fillText("X", 950, 370);
              reasons = customArrayRemove(reasons, dedicatedReasons[3]);
            }
            if (
              reasons.find(
                element => element.toLowerCase().startsWith(dedicatedReasons[4])
              )
            ) {
              ctx.fillText("X", 41, 425);
              reasons = customArrayRemove(reasons, dedicatedReasons[4]);
            }
            if (
              reasons.find(
                element => element.toLowerCase().startsWith(dedicatedReasons[5])
              )
            ) {
              ctx.fillText("X", 350, 425);
              reasons = customArrayRemove(reasons, dedicatedReasons[5]);
            }
            if (
              reasons.find(
                element => element.toLowerCase().startsWith(dedicatedReasons[6])
              )
            ) {
              ctx.fillText("X", 653, 425);
              reasons = customArrayRemove(reasons, dedicatedReasons[6]);
            }
            if (
              reasons.find(
                element => element.toLowerCase().startsWith(dedicatedReasons[7])
              )
            ) {
              ctx.fillText("X", 960, 425);
              reasons = customArrayRemove(reasons, dedicatedReasons[7]);
            }
            if (reasons.length) {
              ctx.fillText("X", 45, 500);
              ctx.fillText(imports.trim(reasons.join(", "), 41), 188, 490);
            }
       
         
            const time = `${imports.message.createdAt.getUTCDate()}/${imports.message.createdAt.getUTCMonth() +
              1}/${imports.message.createdAt.getUTCFullYear()} ${imports.message.createdAt.getUTCHours()}.${imports.message.createdAt.getUTCMinutes()} GMT`;
    
            ctx.font = `$30px arial`;
        
          
            ctx.fillText(imports.trim(time, 17), 45, 715);
          
            const location = `#${imports.message.channel.name}, ${imports.message.guild.name}`;
           
       
         
            ctx.fillText(imports.trim(location, 17), 45, 795);
        
          
      

             // message.channel.send(customSplit(form, 16).join("\n"));
              // if(       customSplit(form, 16)[0]){
                if(Array.isArray(imports.customSplit(form.join(" "), 15))){
                ctx.fillText( imports.customSplit(form.join(" "), 15).join(" \n "), 655, 715);
                } else if(!Array.isArray(imports.customSplit(form.join(" ")))){
                  ctx.fillText(imports.customSplit(form.join(" "), 15), 655, 715)
                }
             /* }
              if(       customSplit(form, 16)[1]){
                ctx.fillText(       customSplit(form, 16)[1], 655, 745);
              }
              if(customSplit(form, 16)[1]){
                ctx.fillText(       customSplit(form, 16)[2], 655, 775);
              }
            */
         
            const sender =
              imports.message.author.username + "#" + imports.message.author.discriminator;
   
         
       
            ctx.fillText(imports.trim(sender, 17), 350, 720);

          
            const target = `${user.user.username}#${user.user.discriminator}`;
         
          

            ctx.fillText(imports.trim(target, 17), 350, 790);
            return imports.message.channel.send(new imports.Discord.MessageAttachment(
              canvas.toBuffer(),
              `${imports.message.id}.png`
            ));}
        
renderImage().then(()=> {
  
}).catch(error => {
     imports.message.channel.send("An error occured! " + error);
   })



  }
};
