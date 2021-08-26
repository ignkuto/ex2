const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
    name: 'lock',
    description: 'locks the server.',
    execute(client, interaction) {
        if(!interaction.member.permissions.has('ADMINISTRATOR'))
        return interaction.reply({embeds: [new MessageEmbed().setTitle('Error').setColor('DARK_RED').setDescription('You don\'t have permission to run thus command.')]})

        const role = interaction.guild.roles.cache.get("879874818089041960");

        if(!role.permissions.has('SEND_MESSAGES') && !role.permissions.has('CONNECT'))
        return interaction.reply({embeds: [new MessageEmbed().setColor('DARK_RED').setTitle('Error').setDescription('The server is already on lockdown.')]})

        role.setPermissions([Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.USE_EXTERNAL_EMOJIS, Permissions.FLAGS.USE_EXTERNAL_STICKERS, Permissions.FLAGS.USE_APPLICATION_COMMANDS, Permissions.FLAGS.CHANGE_NICKNAME, Permissions.FLAGS.CREATE_INSTANT_INVITE]);

        interaction.reply({embeds: [new MessageEmbed().setTitle('YOU ARE NOT MUTED').setColor('RED').setDescription('The server has been locked. You will not be able to talk until futher notice.')]})
    }
}