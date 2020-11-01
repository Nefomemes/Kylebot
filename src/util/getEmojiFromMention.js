module.exports = function (mention, EmojiManager) {
      if(!mention || !EmojiManager) return;
      mention = `${mention}`;
      
      mention = mention.match(/^<a?:(\w+):(\d+)>$/);
      if(!mention) return;
      return EmojiManager.resolve(mention[2]);
      }