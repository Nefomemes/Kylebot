module.exports = function getUserFromMention(mention, UserManager) {
	async function run(){
    if (!mention ||!UserManager) return;
    mention =  `${mention}`


           if (mention.startsWith("<@") && mention.endsWith(">")) {
      mention = mention.slice(2, -1);
      if (mention.startsWith("!")) {
        mention = mention.slice(1);
      }
    }
  try {
  return UserManager.fetch().catch(e => e) ;
 } catch (e) {
     return console.error(e);
 }
 }
 return run().then(i => i);
  }


