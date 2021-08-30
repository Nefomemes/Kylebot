module.exports = function getMemberFromMention(mention, GuildMemberManager){
	
    if (!mention || !GuildMemberManager) return;
 mention = mention.toString();

    if (mention.startsWith("<@") && mention.endsWith(">")) {
      mention = mention.slice(2, -1);
      if (mention.startsWith("!")) {
        mention = mention.slice(1);
      }
    }
    try {
    return GuildMemberManager.fetch(mention).catch(e => null);
} catch {
    return;
}
}