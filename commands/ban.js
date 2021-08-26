const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
const moment = require('moment')

module.exports = {
    name: 'ban',
    description: 'Ban a User.',
    options:
    [{
        name: 'user',
        description: 'select a user to ban.',
        type: "USER",
        required: true,
    },
    {
        name: 'reason',
        description: 'ban reasoning.',
        type: "STRING",
        required: true,
    },
    {
        name: 'messages',
        description: 'choose how many messages will be deleted.',
        type: "STRING",
        required: true,
        choices: 
        [{
            name: 'Don\'t delete any.',
            value: '0'
        },
        {
            name: 'Previous 7 days.',
            value: '7'
        }]
    }],
    execute(client, interaction) {
        const target = interaction.options.getMember('user');

        if(!interaction.member.permissions.has('BAN_MEMBERS'))
        return interaction.reply({embeds: [new MessageEmbed().setColor('DARK_RED').setTitle('Error').setDescription('You can\'t use this command.')] })

        if(target.id === interaction.member.id) 
        return interaction.reply({embeds: [new MessageEmbed().setColor('DARK_RED').setTitle('Error').setDescription('You can\'t ban yourself.')] })

        if(target.permissions.has('BAN_MEMBERS'))
        return interaction.reply({embeds: [new MessageEmbed().setColor('DARK_RED').setTitle('Error').setDescription('You can\'t ban a moderator.')] })

        if(target.roles.highest >= interaction.member.roles.highest)
        return interaction.reply({embeds: [new MessageEmbed().setColor('DARK_RED').setTitle('Error').setDescription('You can\'t ban this person.')] })

        const reason = interaction.options.getString('reason') || 'No reason Provided.';

        if(reason.length > 512)
        return interaction.reply({embeds: [new MessageEmbed().setColor('BLURPLE').setTitle('Error').setDescription('The reason must be 512 or fewer in length.')] })
        
        const amount = interaction.options.getString('messages')

        var currenttime = moment().format('YYYY/MM/DD | HH:MM:SS');

        db.add(`${target.id}-permanentrecord-bans`, 1)
        db.push(`${target.id}-bans`, `[${currenttime}] Ban: ${reason}`)

        target.ban({ days: amount, reason: reason })

        interaction.reply({embeds: [new MessageEmbed().setColor('GREEN').setTitle('Success').setDescription(`Successfully banned ${target.user.tag}.`).addField('Reason',reason).addField('Expires','Never.')]})
    }
}