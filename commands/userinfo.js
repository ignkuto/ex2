const { MessageEmbed, Permissions } = require('discord.js');
const moment = require('moment')


module.exports = {
    name: 'userinfo',
    description: 'Sends Userinfo.',
    options:
    [{
        name: 'user',
        description: 'select a user.',
        type: 'USER',
        required: 'true'
    }],
    execute(client, interaction) {
        let acctype = 'HUMAN';
        const target = interaction.options.getMember('user') || interaction.member

        if(!target.user.bot) {
            acctype = 'HUMAN'
        } else {
            acctype = 'ROBOT'
        }
        
        const embed = new MessageEmbed()
            .setAuthor(`${target.user.username} - Userinfo`, target.user.displayAvatarURL({dynamic: true}))
            .setThumbnail(target.user.displayAvatarURL({dynamic: true}))
            .setColor(target.displayHexColor || 'GREYPLE')
            .addField('ID', target.user.id, false)
            .addField('Status', `${target.presence.status.replace('dnd', 'Do Not Disturb').replace('idle', 'Idle').replace('online', 'Online').replace('offline', 'Offline')}`)
            .addField('Joined Server', moment(target.joinedAt).format("LLLL"))
            .addField('Accounted Created', moment(target.user.createdAt).format("LLLL"))
            .addField('Account Type', `**${acctype}**`)
            .addField(`Roles [${target.roles.cache.size - 1}]`, `${target.roles.cache.map(r => r).join(', ').replace(', @everyone', '').replace('@everyone', 'N/A')}`)
        interaction.reply({embeds: [embed]})
    }
}