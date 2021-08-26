const { Client, CommandInteraction, MessageEmbed} = require('discord.js');
const db = require('quick.db')
const moment = require('moment')

module.exports = {
    name: 'mute',
    description: 'mute a member.',
    permission: 'MUTE_MEMBERS',
    options: [
        {
            name: "user",
            description: "select a user",
            type: "USER",
            required: true,
        },
        {
            name: 'length',
            description: 'length of the mute.',
            type: "STRING",
            required: true,
            choices: [
                {
                    name: '30 Minutes',
                    value: '1800000'
                },
                {
                    name: '1 Hour',
                    value: '3600000'
                },
                {
                    name: '3 Hours',
                    value: '10800000'
                },
                {
                    name: '12 Hours',
                    value: '43200000'
                },
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
                },
                {
                    name: 'Forever',
                    value: 'inf'
                }
            ]
        },
        {
            name: 'reason',
            description: 'provide a reasoning for the mute',
            type: 'STRING',
            required: true
        }
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async execute(client, interaction) {
        const target = interaction.options.getMember('user')
        const reason = interaction.options.getString('reason') || 'No reason Provided.'
        const length = interaction.options.getString('length')
        const role = interaction.guild.roles.cache.get('880251597517619210')

        if(reason.length > 512)
        return interaction.reply({embeds: [new MessageEmbed().setColor('BLURPLE').setTitle('Error').setDescription('The reason must be 512 or fewer in length.')] })

        if(!interaction.member.permissions.has('MUTE_MEMBERS'))
        return interaction.reply({embeds: [new MessageEmbed().setColor('BLURPLE').setTitle('Error').setDescription('You can\'t use this command.')] })

        if(target.permissions.has("MUTE_MEMBERS"))
        return interaction.reply({embeds: [new MessageEmbed().setColor('BLURPLE').setTitle('Error').setDescription('You can\'t mute this person.')] })

        var expiry;

        if(length == 'inf') {
            expiry = 'Never.'
        }
        if(length == '1800000') {
            expiry = '30 Minutes'
        }
        if(length == '3600000') {
            expiry = '1 Hour'
        }
        if(length == '10800000') {
            expiry = '3 Hours'
        }
        if(length == '43200000') {
            expiry = '12 Hours'
        }
        if(length == '86400000') {
            expiry = '1 Day'
        }
        if(length == '259200000') {
            expiry = '3 Days'
        }
        if(length == '604800000') {
            expiry = '1 Week'
        }
        if(length == '1209600000') {
            expiry = '2 Weeks'
        }
        if(length == '2592000000') {
            expiry = '1 Month'
        }

        var currenttime = moment().format('YYYY/MM/DD | HH:MM:SS');

        db.add(`${target.id}-permanentrecord-mutes`, 1)
        db.push(`${target.id}-mutes`, `[${currenttime}] Mute: ${reason}`)

        target.roles.add(role);
        db.set(`${target.id}-muted`, true)
        interaction.reply({embeds: [new MessageEmbed().setColor('GREEN').setTitle("Success").setDescription(`Successfully muted ${target.user.username}.`).addField('Reason', reason).addField('Expires', expiry)]})
        if(length == 'inf') return;
        if(!length == 'inf') {
            setTimeout(() => {
                target.roles.remove(role)
                db.set(`${target.id}-muted`, false)
            }, length);
        }
    }
}