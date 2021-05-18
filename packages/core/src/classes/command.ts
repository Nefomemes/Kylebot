
import type { FortressPermissionString } from "../types/permission";
import type { mriOptions } from "../types/mri/options";
import type { Context } from "./context";
export class Command {
	run: (ctx: Context) => any;
	id: string;
	alias?: Array<string>;
	description?: string;
	permissionNeeded?: Array<FortressPermissionString>;
	botPermissionNeeded?: Array<FortressPermissionString>;
	argv: mriOptions;

}