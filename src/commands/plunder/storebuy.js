

module.exports.run = async (i) => {
    const bundle = i.getItem("bundle", i.args.shift())
    if(!bundle) return i.message.channel.send("That bundle doesn't exist.");
    
    const price = bundle.price || 0; 
    const userDB = await db.collection("users").getDoc({docID: i.message.author.id});
    const balance = userDB.cp || 0;
    if(userDB.bundles && userDB.bundles.includes(bundle.id)) return i.message.channel.send("You already owned this bundle.");
    if(!balance|| balance < price) return i.message.channel.send(`You doesn't have enough money to buy this. You need ${(balance - price )} more <:cp:744403130594230313>.`);
i.message.channel.send(`Are you sure you want to buy ${bundle.name}, sir? This purchase will cost you ${price} <:cp:744403130594230313> and your balance will be ${balance - price} <:cp:744403130594230313>.\n\n \`yes\` - Yes, I want to buy the bundle.\n\`cancel\` - I have changed my mind / accidentally do this command, cancel the purchase.`);
const collector = i.message.channel.createMessageCollector((m) => (m.author.id === i.message.author.id && (m.content.toLowerCase() === "yes" || m.content.toLowerCase() === "cancel")), {time: 120000});
var ok;
collector.once("collect", async (m) => {
    ok = true
    collector.stop();
    switch(m.content.toLowerCase()){
        case "yes":{
           
          await  db.collection("users").updateDoc({docID: i.message.author.id}, {$push: {"bundles": bundle.id}, $inc: {cp: -1 * price}});
            for(let item of bundle.content){
                let itemMeta = i.getItem(item.type, item.id);
                if(itemMeta){
                    await db.collection("users").giveItem({docID: i.message.author.id}, `${item.type}s`, itemMeta.id, {property: "cp", money: (item.worth || itemMeta.defaultValue || (price / bundle.content.length))});
                }
            }
        }
        return i.message.channel.send("Nicely done. Ez pz.");
        case "cancel":
        return i.message.channel.send("Canceled. Ez pz.");
        default:
        return i.message.channel.send("Invalid switch statement.");
    }
}) 
collector.on("end", () => {
    if(!ok && ok !== true) return;
    return i.message.channel.send("Timed out. Please try again.");
})


}