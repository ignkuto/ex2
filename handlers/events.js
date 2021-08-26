const { readdirSync } = require('fs');
const chalk = require('chalk');
const { cyanBright } = require('chalk');

module.exports = (client, Discord) => {
    const eventFolders = readdirSync('./events');
    for (const folder of eventFolders) {
        const eventFiles = readdirSync(`./events/${folder}`).filter(files => files.endsWith('.js'));
        for (const file of eventFiles) {
            const event = require(`../events/${folder}/${file}`);
            console.log(chalk.cyanBright(`${file.split('.')[0]} has been loaded [EVENT]`))
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client, Discord));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client, Discord));
            };
        };
    };
};