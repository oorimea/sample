const { Collection, ActivityType } = require('discord.js');
const path = require('path');
const fs = require('fs');

/**
 * @param {import('discord.js').Client} client
 */
module.exports = (client, prefix) => {
    client.commands = new Collection();

    const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);

        if (typeof command.name === 'string') client.commands.set(command.name, command);
        if (Array.isArray(command.name)) {
            for (const alias of command.name) {
                client.commands.set(alias, command);
            }
        }
    }

    client.once('ready', () => {
        console.log(`Logged in as ${client.user.username}`);
        client.user.setPresence({
            activities: [{ type: ActivityType.Custom, name: 'customstatus', state: 'add any state here'}],
        });
    });

    client.on('messageCreate', (message) => {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;
        try {
            command.execute(message, args);
            delete require.cache[require.resolve(`./commands/${command.name[0]}.js`)];
        } catch (error) {
            console.error(error);
            message.reply('There was an error trying to execute that command.');
        }
    });
}