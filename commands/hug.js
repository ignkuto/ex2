const { Client, CommandInteraction, MessageEmbed} = require('discord.js');

module.exports = {
    name: 'hug',
    description: 'hug a member.',
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
        const number = Math.floor(Math.random() * 5 + 1)

        if(target == interaction.member) return interaction.reply('damn you lonely.')
        if(target.user.bot) return interaction.reply('you cant hug a robot.')

        var url;

        if(number == 1) url = 'https://media.giphy.com/media/wnsgren9NtITS/giphy.gif?cid=790b76114045a2e4f716fe920bad3ee6f3e08565707744d6&rid=giphy.gif&ct=g'
        if(number == 2) url = 'https://media.giphy.com/media/HaC1WdpkL3W00/giphy.gif?cid=790b761177083f55937d06abf590a7233b90502604b8e5ac&rid=giphy.gif&ct=g'
        if(number == 3) url = 'https://media.giphy.com/media/PHZ7v9tfQu0o0/giphy.gif?cid=790b7611d2d2f28031f0ebc085c92f09ad0957750e932176&rid=giphy.gif&ct=g'
        if(number == 4) url = 'https://media.giphy.com/media/kvKFM3UWg2P04/giphy.gif?cid=790b76114b76add3d2cede2cf69503a75db6a5057a267d0e&rid=giphy.gif&ct=g'
        if(number == 5) url = 'https://media.giphy.com/media/lrr9rHuoJOE0w/giphy.gif?cid=790b7611317971769a620a7ae3a494584587adb2a08876a5&rid=giphy.gif&ct=g'

        interaction.reply({embeds: [new MessageEmbed().setColor('FUCHSIA').setTitle('Hug').setDescription(`${interaction.user} hugged ${target} 🥰`).setImage(url)]})
    }
}