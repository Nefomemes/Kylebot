module.exports.run = async (imports)=> {
switch(imports.args.shift().toLowerCase()){
    case "steam":
    
    break;
    default:
    imports.message.channel.send("The platform you are trying to use is probably ha")
}
}