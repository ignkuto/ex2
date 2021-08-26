const { Client, CommandInteraction, MessageEmbed} = require('discord.js');
const db = require('quick.db')

module.exports = {
    name: 'infractions',
    description: 'check a member\'s infractions.',
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

        if(!interaction.member.permissions.has('BAN_MEMBERS'))
        return interaction.reply({embeds: [new MessageEmbed().setColor('RED').setTitle('Error').setDescription('You can\'t use this command.')]})

        let warns;
        let mutes;
        let kicks;
        let bans;

        if(db.get(`${target.id}-warnings`)) {
            warns = db.get(`${target.id}-warnings`).join('\n')
        } else {
            warns = 'No Previous Warnings.'
        }
        if(db.get(`${target.id}-mutes`)) {
            mutes = db.get(`${target.id}-mutes`).join('\n')
        } else {
            mutes = 'No Previous Mutes.'
        }
        if(db.get(`${target.id}-kicks`)) {
            kicks = db.get(`${target.id}-kicks`).join('\n')
        } else {
            kicks = 'No Previous Kicks.'
        }
        if(db.get(`${target.id}-bans`)) {
            bans = db.get(`${target.id}-bans`).join('\n')
        } else {
            bans = 'No Previous Bans.'
        }

        const infembed = new MessageEmbed()
            .setTitle('Infractions')
            .addField(`Warns (${db.get(target.id + '-permanentrecord-warns') || 0})`, `\`\`\`${warns}\`\`\``)
            .addField(`Mutes (${db.get(target.id + '-permanentrecord-mutes') || 0})`, `\`\`\`${mutes}\`\`\``)
            .addField(`Kicks (${db.get(target.id + '-permanentrecord-kicks') || 0})`, `\`\`\`${kicks}\`\`\``)
            .addField(`Bans (${db.get(target.id + '-permanentrecord-bans') || 0})`, `\`\`\`${bans}\`\`\``)
            .setColor('BLURPLE')
        interaction.reply({embeds: [infembed], ephemeral: false})
    }
}