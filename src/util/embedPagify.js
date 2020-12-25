

module.exports = function embedPagify(embed, opts = {}){
if(!embed.fields.length) return embed;
	let number = parseInt(opts.page);

	if (Number.isNaN(number)) {
		number = 1;
	}
	let length = parseInt(opts.length);
	
	if(Number.isNaN(length) || length > 25){
		length = 4;
	}
	let pages = _.chunk(embed.fields, opts.length || 6);
embed.fields = [];
	embed = embed.setFooter(
		__.trim(`Page ${number}/${pages.length} ${(() => {
			if(embed.footer && embed.footer.text) return ` | ${embed.footer.text}`

			return "";
		})()}`, 2048)
	);
if(pages[number - 1]){
	for (let field of pages[number - 1]) {
		embed.addField(field.name, field.value, field.inline);
	}
}
return embed;
}