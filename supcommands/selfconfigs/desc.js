module.exports = {
    desc: "Modify your profile description.",
    docs: "https://github.com/Nefomemes/docs/blob/main/Kylebot/super-commands/selfconfigs.md#prefixselfconfigs-desc-description-",
    run: async (i) => {
        
        if(i.argv.desc){
          if(typeof i.argv.desc !== "string")   return i.message.channel.send(
              `The \`desc\` option must be a string.`
          );
 
         if(i.argv.desc.length > 141) return i.message.channel.send(
             `Profile escriptions are limited to **141** characters.`
         );
         await db.collection("users").updateDoc(
             {
                 docID: i.message.author.id
             },
             {
                 $set: {desc: i.argv.desc}
             }
         );
         } else if(i.argv.remove_description && i.argv.remove_description === true){
             await db.collection("users").updateDoc(
                 {docID: i.message.author.id},
                 {
                     $unset: {desc: ""}
                 }
             );
         } else {
             const userDB = await db.collection("users").getDoc({docID: i.message.author.id});
             return i.message.channel.send(
                `Current description: ${userDB.desc || "none"}
 
                 To change the description add the \`desc\` option with the description you want.
                 To get rid of the description. Add the \`remove_description\` option like this: \`--remove_description\`.
                 `
             );
         }
         return i.message.channel.send("Nicely done. Ez pz.");
         
        
     }
}
