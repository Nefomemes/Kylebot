import type { Command } from "./command"; 
import type { Message } from "discord.js";
export class Context {
command: Command;
argv: object;
message: Message;

}