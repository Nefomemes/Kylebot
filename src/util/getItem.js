module.exports =  function getItem(collection, item, type) {
    if (!collection) return;
    var items;
    try {
       items = require(`./items/${collection}s`);
      
  } catch (e){
	  console.error(e);
  	try {
  		items = require(`./items/${collection}s.json`);
  	} catch (e) {
		  console.error(e);
    return null;
  	}
    }
      if(type && type.toLowerCase() === "all") return items;
      item = (item || "default").toLowerCase();
      if (item === "default") {
        let result = items.filter((value) => {
          return value.default && value.default === true;
        })
        if (!result.length) return;
        return result[Math.floor(Math.random() * result.length)];
      } else {
    return search(items, item);
      }
  }