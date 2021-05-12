module.exports = {
    desc: "Modify your profile description.",
    docs: "https://github.com/Nefomemes/docs/blob/main/Kylebot/super-commands/selfconfigs.md#prefixselfconfigs-desc-description-",
    run: async (i) => {
        
        if(i.argv.d){
          if(typeof i.argv.desc !== "string")   return i.message.channel.send(
              `The \`d\` option must be a string.`
          );
 
         if(i.argv.d.length > 141) return i.message.channel.send(
             `Profile escriptions are limited to **141** characters.`
         );
         await db.collection("users").updateDoc(
             {
                 docID: i.message.author.id
             },
             {
                 $set: {desc: i.argv.d}
             }
         );
         } else if(i.argv.rd && i.argv.rd === true){
             await db.collection("users").updateDoc(
                 {docID: i.message.author.id},
                 {
                     $unset: {desc: ""}
                 }
             );
         } else {
             const userDB = await db.collection("users").getDoc({docID: i.message.author.id});
             return i.message.channel.send(
                `Your current description: ${userDB.desc || "none"}
 
                 To change the description add the \`d\` option with the description you want.
                 To get rid of the description, set the \`rd\` option to true.
                 `
             );
         }
         return i.message.channel.send("Nicely done. Ez pz.");
         
        
     }
}
