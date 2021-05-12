module.exports = function parseCLIOptions(o, opts){
	   var rawArgv;
        if(typeof o === "string"){
        rawArgv = require("shell-quote").parse(o)
        }
	
        var argv = require("mri")(rawArgv, opts);
        for(let [key, value] of Object.entries(argv)){
          if(typeof value === "string"){
          if(value.toLowerCase() === "true"){
            argv[key] = true;
          } else if(value.toLowerCase() === "false"){
            argv[key] = false;
          }
          } 
        }

        return argv;
}