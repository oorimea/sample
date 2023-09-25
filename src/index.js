require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages
    ],
});

const prefix = 'f!';
require('./loader')(client, prefix);

client.login(process.env.TOKEN)