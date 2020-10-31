module.exports = function (array, item){
	array = array.filter((value) => value && (value.id && value.id === item || value.name && (value.name.toLowerCase().startsWith(item) || value.name.toLowerCase().endsWith(item) || value.name.toLowerCase().split(item.toLowerCase())[1]) || item.toLowerCase().split(value.name.toLowerCase())[1] || value.name.toLowerCase() === item.toLowerCase()));
	if(array.length > 1){
		array = array.filter((value) => value && (value.id && value.id === item || value.name && value.name.toLowerCase() === item.toLowerCase()));
	}
	return array[0];
}