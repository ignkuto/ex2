const { Client, CommandInteraction, MessageEmbed} = require('discord.js');
const db = require('quick.db')

module.exports = {
    name: 'setnick',
    description: 'change a member\'s nickname.',
    options: [
        {
            name: "user",
            description: "select a user",
            type: "USER",
            required: true
        },
        {
            name: 'nickname',
            description: 'what to set the user\'s nickname to',
            type: "STRING",
            required: true,
        }
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async execute(client, interaction) {
        const target = interaction.options.getMember('user')
        const nick = interaction.options.getString('nickname')

        if(!interaction.member.permissions.has('MANAGE_NICKNAMES'))
        return interaction.reply({embeds: [new MessageEmbed().setColor('BLURPLE').setTitle('Error').setDescription('You don\'t have permission to use this command.')]})

        if(nick.length > 32)
        return interaction.reply({embeds: [new MessageEmbed().setColor('BLURPLE').setTitle('Error').setDescription('The nickname must be 32 or fewer in length.')]})

        if(target.permissions.has('MANAGE_NICKNAMES'))
        return interaction.reply({embeds: [new MessageEmbed().setColor('BLURPLE').setTitle('Error').setDescription('You can\'t change that user\'s nickname.')]})

        target.setNickname(nick, "Nickname Command")

        interaction.reply({embeds: [new MessageEmbed().setColor('GREEN').setTitle("Success").setDescription(`Successfully changed ${target.user.username}'s Nickname to "${nick}"`)]})
    }
}