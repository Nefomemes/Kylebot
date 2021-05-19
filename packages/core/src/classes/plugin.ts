import { FortressClient } from "./client";

/**
 * 
 */
export class Plugin {
	/**
	 * 
	 */
	name: string;
	
	client: FortressClient;

	use(plugin: Plugin) : Plugin {

		this.client.use(plugin);
		return this;
	}


}