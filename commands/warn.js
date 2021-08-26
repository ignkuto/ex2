const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
const moment = require('moment')

module.exports = {
    name: 'warn',
    description: 'Warn a User.',
    options:
    [{
        name: 'user',
        description: 'select a user to warn.',
        type: "USER",
        required: true,
    },
    {
        name: 'reason',
        description: 'warn reasoning.',
        type: "STRING",
        required: true,
    }],
    execute(client, interaction) {
        const target = interaction.options.getMember('user');

        if(!interaction.member.permissions.has('MUTE_MEMBERS'))
        return interaction.reply({embeds: [new MessageEmbed().setColor('RED').setTitle('Error').setDescription('You can\'t use this command.')] })

        if(target.id === interaction.member.id) 
        return interaction.reply({embeds: [new MessageEmbed().setColor('RED').setTitle('Error').setDescription('You can\'t ban yourself.')] })

        if(target.permissions.has('MUTE_MEMBERS'))
        return interaction.reply({embeds: [new MessageEmbed().setColor('RED').setTitle('Error').setDescription('You can\'t ban a moderator.')] })

        if(target.roles.highest >= interaction.member.roles.highest)
        return interaction.reply({embeds: [new MessageEmbed().setColor('RED').setTitle('Error').setDescription('You can\'t ban this person.')] })

        const reason = interaction.options.getString('reason') || 'No reason Provided.';

        if(reason.length > 512)
        return interaction.reply({embeds: [new MessageEmbed().setColor('BLURPLE').setTitle('Error').setDescription('The reason must be 512 or fewer in length.')] })
        
        var currenttime = moment().format('YYYY/MM/DD | HH:MM:SS');

        db.add(`${target.id}-permanentrecord-warns`, 1)
        db.push(`${target.id}-warnings`, `[${currenttime}] Warn: ${reason}`)

        interaction.reply({embeds: [new MessageEmbed().setColor('GREEN').setTitle('Success').setDescription(`Successfully warned ${target.user.tag}.`).addField('Reason',reason)]})
        console.log(db.get(`${target.id}-warnings`))
    }
}