const { Client, CommandInteraction, MessageEmbed} = require('discord.js');
const db = require('quick.db')

module.exports = {
    name: 'remove',
    description: 'remove a role from a member.',
    options: [
        {
            name: "user",
            description: "select a user",
            type: "USER",
            required: true
        },
        {
            name: "role",
            description: "select a role",
            type: "ROLE",
            required: true
        },
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async execute(client, interaction) {
        const target = interaction.options.getMember('user')
        const role = interaction.options.getRole('role')

        if(!interaction.member.permissions.has('ADMINISTRATOR'))
        return interaction.reply({embeds: [new MessageEmbed().setColor('BLURPLE').setTitle("Error").setDescription(`You can\'t use this command.`)]})

        target.roles.remove(role)
        
        interaction.reply({embeds: [new MessageEmbed().setColor('GREEN').setTitle("Success").setDescription(`Successfully removed the ${role.name} role from ${target.user.username}.`)]})
    }
}