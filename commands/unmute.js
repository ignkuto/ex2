const { Client, CommandInteraction, MessageEmbed} = require('discord.js');
const db = require('quick.db')

module.exports = {
    name: 'unmute',
    description: 'unmute a member.',
    permission: 'MUTE_MEMBERS',
    options: [
        {
            name: "user",
            description: "select a user",
            type: "USER",
            required: true
        },
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async execute(client, interaction) {
        const target = interaction.options.getMember('user')
        const role = interaction.guild.roles.cache.get('880251597517619210')

        if(!interaction.member.permissions.has('MUTE_MEMBERS'))
        return interaction.reply({embeds: [new MessageEmbed().setColor('BLURPLE').setTitle("Error").setDescription(`You can\'t use this command.`)]})


        if(db.get(`${target.id}-muted`) == false)
        return interaction.reply({embeds: [new MessageEmbed().setColor('BLURPLE').setTitle('Error').setDescription('This user isn\'t muted.')]})

        target.roles.remove(role)
        db.set(`${target.id}-muted`, false)
        interaction.reply({embeds: [new MessageEmbed().setColor('GREEN').setTitle("Success").setDescription(`Successfully unmuted ${target.user.username}.`)]})
    }
}