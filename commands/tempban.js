const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
const moment = require('moment')

module.exports = {
    name: 'tempban',
    description: 'Temporarily ban a User.',
    options:
    [{
        name: 'user',
        description: 'select a user to ban.',
        type: "USER",
        required: true,
    },
    {
        name: 'length',
        description: 'choose the length of the ban.',
        type: 'STRING',
        required: true,
        choices:
        [ 
        {
            name: '1 Day',
            value: '86400000'
        },
        {
            name: '3 Days',
            value: '259200000'
        },
        {
            name: '7 Days',
            value: '604800000'
        },
        {
            name: '14 Days',
            value: '1209600000'
        },
        {
            name: '30 Days',
            value: '2592000000'
        }
    ]
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
        return interaction.reply({embeds: [new MessageEmbed().setColor('RED').setTitle('Error').setDescription('You can\'t use this command.')] })

        if(target.id === interaction.member.id) 
        return interaction.reply({embeds: [new MessageEmbed().setColor('RED').setTitle('Error').setDescription('You can\'t ban yourself.')] })

        if(target.permissions.has('BAN_MEMBERS'))
        return interaction.reply({embeds: [new MessageEmbed().setColor('RED').setTitle('Error').setDescription('You can\'t ban a moderator.')] })

        if(target.roles.highest >= interaction.member.roles.highest)
        return interaction.reply({embeds: [new MessageEmbed().setColor('RED').setTitle('Error').setDescription('You can\'t ban this person.')] })

        const reason = interaction.options.getString('reason') || 'No reason Provided.';

        if(reason.length > 512)
        return interaction.reply({embeds: [new MessageEmbed().setColor('BLURPLE').setTitle('Error').setDescription('The reason must be 512 or fewer in length.')] })
        
        const amount = interaction.options.getString('messages')
        const length = interaction.options.getString('length')

        var lengthim
        if(length == '86400000') {
            lengthim = '1 Day'
        } else {
            if(length == '259200000') {
                lengthim = '3 Days'
            } else {
                if(length == '604800000') {
                    lengthim = '1 Week'
                } else {
                    if(length == '1209600000') {
                        lengthim = '2 Weeks'
                    } else {
                        if(length == '2592000000') {
                            lengthim = '1 Month'
                        }
                    }
                }
            }
        }

        var currenttime = moment().format('YYYY/MM/DD | HH:MM:SS');

        db.add(`${target.id}-permanentrecord-bans`, 1)
        db.push(`${target.id}-bans`, `[${currenttime}] Tempban: ${reason}`)

        target.ban({ days: amount, reason: reason })
        setTimeout(() => {
            interaction.guild.bans.remove(target.user.id)
        }, length);

        interaction.reply({embeds: [new MessageEmbed().setColor('GREEN').setTitle('Success').setDescription(`Successfully banned ${target.user.tag}.`).addField('Reason',reason).addField('Expires In',lengthim)]})
    }
}