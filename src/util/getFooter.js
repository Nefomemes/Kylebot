module.exports = function getFooter(string){
	    const funfact = require("../assets/funfact.json");
    return `Prefix: ${configs.prefix} | ` + configs.status + " | "+ ( string || funfact[Math.floor(Math.random() * funfact.length)])
}
module.exports.aliases = ["getRandomFunfact"];