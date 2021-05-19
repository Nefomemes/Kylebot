import { Client } from 'discord.js';
import { Plugin } from './plugin';
import type { Command } from './command';
export class FortressClient extends Client {
	use(plugin: Plugin){
		  if(typeof plugin === "string"){
			  import()
		  }
	}

	plugins: Array<Plugin>;

	commands: Array<Plugin> = [];
}