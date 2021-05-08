module.exports = function getChannelFromMention(mention, ChannelManager){
	
    if (!mention || !ChannelManager) return;
   mention = mention.toString();
    
    if (mention.startsWith("<#") && mention.endsWith(">")) mention = mention.slice(2, -1);
    try {
        if(ChannelManager.fetch){
   return ChannelManager.fetch(mention).catch(i => null);
        } else if(ChannelManager.resolve){
               return ChannelManager.resolve(mention)
        }
 
    } catch {
        return null;
    }
}