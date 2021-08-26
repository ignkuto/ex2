const Discord = require('discord.js');
require('dotenv').config();
const { Client, Collection } = Discord;
const client = new Client({intents: 32767});
client.setMaxListeners(0);
module.exports = client;

client.commands = new Collection();

['events', 'commands'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})

client.login(process.env.TOKEN);