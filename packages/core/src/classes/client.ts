import { Client } from 'discord.js';
import { Router } from './router';
import type { Command } from './command';
export class FortressClient extends Client {
	use(){

	}

	commands: Array<Command> = [];
}