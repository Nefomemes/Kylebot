module.exports.run = async (imports) => {
    const query = imports.querystring.stringify({a: imports.args.shift() || "node-grau"}).slice(2);
    
}