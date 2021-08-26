const { Client, CommandInteraction, MessageEmbed} = require('discord.js');
const db = require('quick.db')
const ms = require('ms')

module.exports = {
    name: 'slowmode',
    description: 'change a channel\'s slowmode.',
    options: [
        {
            name: 'time',
            description: 'what you want to set the slowmode to (in seconds)',
            type: "INTEGER",
            required: false,
        }
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async execute(client, interaction) {
        var time = interaction.options.getInteger('time') || 0

        if(time > 21600) time = 21600

        if(!interaction.member.permissions.has('MANAGE_MESSAGES'))
        return interaction.reply({embeds: [new MessageEmbed().setColor('BLURPLE').setTitle('Error').setDescription('You don\'t have permission to use this command.')]})

        interaction.channel.setRateLimitPerUser(time)
        return interaction.reply({embeds: [new MessageEmbed().setColor('GREEN').setTitle('Success').setDescription(`Set slowmode in this channel to ${ms(time * 1000, {long: true})}`)]})
    }
}