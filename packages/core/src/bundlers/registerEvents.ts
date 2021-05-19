module.exports = async function registerEvents(
	dir = path.join(process.__maindir, 'events')
) {

	let files = await fs.readdir(dir);
	if(process_argv.dev && process.argv.dev === true) console.log(`Registering events for ${dir}.`);
	for (let file of files) {
var path_idkb = path.join(dir, file);
		let stat = await fs.lstat(
		path_idkb
		);
		
		if (!stat.isDirectory() && file.endsWith('.js')) {
			if(process_argv.dev && process.argv.dev === true) console.log(`Registering ${path_idkb} as an event.`);
			let eventName = file.slice(0, -3);
			client.on(
				eventName,
				require(path.join(dir, eventName))
			);
		} else if(stat.isDirectory()){

		} 
			else if(process_argv.dev && process.argv.dev === true) console.log(`${path_idkb} is not a JS file. Ignoring.`);
	}
}