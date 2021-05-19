 import { promises as fs } from "fs";
import * as path from "path";

export default async function registerCommands(
	dir = path.join(process.env.pwd, 'commands'),
	commands,
	defaultSettings = {}) {

	var files = await fs.readdir(dir, {});
	// if(process.argv.dev) console.log(`Registering ${type}s of ${dir}`);
	files.forEach( async (file) => {
	
		let path_idkb = path.join(dir, file);
		let stat = await fs.lstat(path_idkb);
		if (stat.isDirectory()) {
			//if(process_argv.dev && process.argv.dev === true) console.log(`${path_idkb} is a folder. Registering commands inside of it.`);
			registerCommands(path.join(dir, file),  commands, defaultSettings);
			}

		else if (file.endsWith('.js')) {
			// if(process_argv.dev && process.argv.dev === true) console.log(`${path_idkb} is a JS file. Checking if it's a valid command.`);
			let commandCode = require(path.join( dir, file));
			let commandName = file.slice(0, -3);


			if (commandCode.run) {
				let command = {
					...defaultSettings,
			...commandCode,
					name: commandName
				};
				commandCache.set(commandName, command);
			} else if(process_argv.dev && process.argv.dev === true) console.log(`${path_idkb} doesn't have a run property. Ignoring.`);
			
		} else if(process_argv.dev && process.argv.dev === true) console.log(`${path_idkb} is neither a JS file or a folder. Ignoring.`);


	});


}