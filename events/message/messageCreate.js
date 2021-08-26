const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: "messageCreate",
    /**
     * @param {Client} client
     * @param {Message} message
     */
    async execute(message, client, Discord) {
        if (!message.content.startsWith(config.prefix) || message.author.bot) return;
        
        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;

        if (command.permissions) {
            const authorPerms = message.channel.permissionsFor(message.author);
            if (!authorPerms || !authorPerms.has(command.permissions)) {
                const embed = new MessageEmbed()
                    .setColor('DARK_RED')
                    .setTitle('Error')
                    .setDescription('Insufficient Permissions.')
                
                message.reply({embeds: [embed]})
                .then(noperms => {
                    setTimeout(() => {
                        noperms.delete();
                    }, 2000);
                })
            }
        }
        try {
            command.execute(message,args,commandName,client,Discord);
        } catch(error) {
            console.log(error);
            const embederr = new MessageEmbed()
                .setColor('DARK_RED')
                .setTitle('Error')
                .setDescription('An unknown error has occured. Please contact an administrator.')
            message.channel.send({embeds: [embederr]})
        }
    }
}
