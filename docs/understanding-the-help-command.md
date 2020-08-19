# Understanding the Help Command

<p>This document will help you understand on how to use the bot using the help command. This command stores all metadata of the specified command. If you are still confused, feel free to join the support server <a href="https://web.nefomemes.repl.co/Kylebot/support">here</a>.</p>

## Prefix

<p>Not like Whatsapp bots, Discord bots utilies "prefix" to determine if a user was running a command or not. Prefixes usually provided before the command name. For example, <code>mw!help</code>.</p>

<p>The prefix of Kylebot is "mw!". However, if you forgot the prefix, keep in mind the bot should always displays the <code>mw!help</code> text in its activities.</p>

## Understanding Arguments

<p>Every Discord bots utilise "arguments" that the user specified after the name of the command and the prefix. Arguments are each words that are placed after the command name and the prefix. This means the message content, removed the prefix and the command name at the front, then split the remaining message content with " " and turn each words into an array of arguments.</p>

<p>This would mean this sentence: "Hello there.", will become ["Hello", "there."] (splitted).</p>

<p>However, this will not affect long text like when the user providing the description they want to use for their profile. This kind of thing usually placed at the very back of the syntax or utilise "argument separator".</p>

## Understanding Argument Separators

<p>"Argument separators" are a way to separate arguments that separates arguments that allows spaces. Ugh, I think this part will be hard to understand. Let's just jump into examples.</p>

<p>Argument separators allow spaces, which is not allowed by regular arguments. (Argument spearators are not an argument as it doesn't have any data).</p>

<p>
