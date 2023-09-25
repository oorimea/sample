const { EmbedBuilder } = require('discord.js');

/**
 * @param {import('discord.js').Client} client
 */
module.exports = {
    name: ['embed', 'embed2'],

    async execute(message) {
        return message.reply({
            embeds: [new EmbedBuilder()
                .setColor('Blurple')
                .setTitle('Hi')
                .setDescription('This is a sample embed')
                .setTimestamp()
            ]
        });
    }
}