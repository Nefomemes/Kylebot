
import type { FortressPermissionString } from "../types/permissionstring";
import type { mriOptions } from "../types/mri/options";
import type { Context } from "./context";
export class Command {
	run: (ctx: Context) => any;
	id: string;
	alias?: Array<string>;
	description?: string;
	permissionNeeded?: Array<FortressPermissionString | ((ctx: Context) => boolean)>;
	botPermissionNeeded?: Array<FortressPermissionString | ((ctx: Context) => boolean)>;
	argv: mriOptions;

}