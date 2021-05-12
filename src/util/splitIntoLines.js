module.exports = function splitIntoLines(str, maxLength){
	    if (str.length <= maxLength) return [str];
    var parts = str.match(new RegExp(".{1," + maxLength + "}", "g"));
    return parts;
}