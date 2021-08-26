const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
    name: 'unlock',
    description: 'Unlocks the server.',
    execute(client, interaction) {
        if(!interaction.member.permissions.has('ADMINISTRATOR'))
        return interaction.reply({embeds: [new MessageEmbed().setTitle('Error').setColor('DARK_RED').setDescription('You don\'t have permission to run thus command.')]})

        const role = interaction.guild.roles.cache.get("879874818089041960")

        if(role.permissions.has('SEND_MESSAGES') && role.permissions.has('CONNECT '))
        return interaction.reply({embeds: [new MessageEmbed().setColor('DARK_RED').setTitle('Error').setDescription('The server isn\'t on lockdown.')]})

        role.setPermissions([Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.USE_EXTERNAL_EMOJIS, Permissions.FLAGS.USE_EXTERNAL_STICKERS, Permissions.FLAGS.USE_APPLICATION_COMMANDS, Permissions.FLAGS.CHANGE_NICKNAME, Permissions.FLAGS.CREATE_INSTANT_INVITE, Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.CONNECT]);

        interaction.reply({embeds: [new MessageEmbed().setTitle('Lockdown').setColor('GREEN').setDescription('The server lockdown has ended.')]})
    }
}