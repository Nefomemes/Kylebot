global.__ = {}
module.exports = async function registerUtils(
	dir = path.join(process.cwd(), "src/util"),
	obj = global.__,
){
	var files = await fs.readdir(dir);

	for (let file of files){
		let path1 = path.join(dir, file);
		let stat = await fs.lstat(path1);
		if(stat.isDirectory()){
			registerUtils(path1);
		} else {
			if(file.endsWith(".js")){
				file = file.slice(0, -2);
				obj[file] = require(path1);
			}
		}
	}
}