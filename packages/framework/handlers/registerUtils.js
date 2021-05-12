
module.exports = async function registerUtils(
	dir = path.join(process.__maindir, "util"),
	obj = {},
){
	var files = await fs.readdir(dir);

	for (let file of files){
<<<<<<< HEAD

		let path1 = path.join(dir, file);
		

		let stat = await fs.lstat(path1);
		if(stat.isDirectory()){
			
			registerUtils(path1);
		} else {
			if(file.endsWith(".js")){
			
=======
		let path1 = path.join(dir, file);
		let stat = await fs.lstat(path1);
		if(stat.isDirectory()){
			registerUtils(path1);
		} else {
			if(file.endsWith(".js")){
>>>>>>> origin/dev
				let fnc = require(path1);
				file = file.slice(0, -3);
				obj[file] = fnc;

				if(fnc.aliases && fnc.aliases.length){
					for(let alias of fnc.aliases){
						obj[alias] = fnc;
					}
				}
			}
		}
	}
<<<<<<< HEAD

	return obj;

=======
	return obj;
>>>>>>> origin/dev
}