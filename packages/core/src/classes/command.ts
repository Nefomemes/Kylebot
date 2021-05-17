import type { PermissionString } from 'discord.js';

export type CommandType = {
	run: (ctx: Context) => any;

	id: string;

	alias?: Array<string>;

	description?: string;

	permissionNeeded?: Array<PermissionString>;


}