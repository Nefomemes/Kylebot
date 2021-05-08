

module.exports = function embedPagify(embed, opts = {}){
<<<<<<< HEAD
if(!embed.fields.length) return embed;
=======
>>>>>>> origin/dev
	let number = parseInt(opts.page);

	if (Number.isNaN(number)) {
		number = 1;
	}
<<<<<<< HEAD
	let length = parseInt(opts.length);
	
	if(Number.isNaN(length) || length > 25){
		length = 4;
	}
	let pages = _.chunk(embed.fields, opts.length || 6);
embed.fields = [];
=======
	let pages = _.chunk(embed.fields, opts.length || 6);
		embed.fields = [];
	
>>>>>>> origin/dev
	embed = embed.setFooter(
		__.trim(`Page ${number}/${pages.length} ${(() => {
			if(embed.footer && embed.footer.text) return ` | ${embed.footer.text}`

			return "";
		})()}`, 2048)
	);
<<<<<<< HEAD
if(pages[number - 1]){
	for (let field of pages[number - 1]) {
=======
if(pages[number]){
	for (let field of pages[number]) {
>>>>>>> origin/dev
		embed.addField(field.name, field.value, field.inline);
	}
}
return embed;
}