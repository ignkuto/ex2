const { blue } = require('chalk');
const chalk = require('chalk')

module.exports = {
    name: "ready",
    execute(client) {
        console.log(blue(`Logged on as ${client.user.username}#${client.user.discriminator} [SUCCESS]`))
        client.user.setActivity('toh.noobies', {type: 'WATCHING'});
    }
};