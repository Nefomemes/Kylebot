module.exports = function trim(string, max) {
		  string = `${string}`;
    if (string.length <= max) return string;
    return `${string.slice(0, max - 3)}...`;
}