const { magenta } = require('chalk');
const { readdirSync } = require('fs');

module.exports = (client) => {
        const commandFiles = readdirSync(`./commands/`).filter(files => files.endsWith('.js'));
        const commandsArray = [];
        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);
            client.commands.set(command.name, command);
            commandsArray.push(command);
            console.log(magenta(`${file.split('.')[0]} has been loaded [COMMAND]`))

            client.on("ready", () => {
                client.guilds.cache.get("865164888748982303").commands.set(commandsArray);
            });
        };
    };