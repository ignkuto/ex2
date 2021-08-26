const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kick a User.',
    options:
    [{
        name: 'user',
        description: 'select a user to kick.',
        type: "USER",
        required: true,
    },
    {
        name: 'reason',
        description: 'kick reasoning.',
        type: "STRING",
        required: true,
    }],
    execute(client, interaction) {
        const target = interaction.options.getMember('user');

        if(!interaction.member.permissions.has('KICK_MEMBERS'))
        return interaction.reply({embeds: [new MessageEmbed().setColor('ORANGE').setTitle('Error').setDescription('You can\'t use this command.')] })

        if(target.id === interaction.member.id) 
        return interaction.reply({embeds: [new MessageEmbed().setColor('ORANGE').setTitle('Error').setDescription('You can\'t kick yourself.')] })

        if(target.permissions.has('ADMINISTRATOR'))
        return interaction.reply({embeds: [new MessageEmbed().setColor('ORANGE').setTitle('Error').setDescription('You can\'t kick a server administrator.')] })

        if(target.roles.highest >= interaction.member.roles.highest)
        return interaction.reply({embeds: [new MessageEmbed().setColor('ORANGE').setTitle('Error').setDescription('You can\'t kick this person.')] })

        const reason = interaction.options.getString('reason');

        if(reason.length > 512)
        return interaction.reply({embeds: [new MessageEmbed().setColor('BLURPLE').setTitle('Error').setDescription('The reason must be 512 or fewer in length.')] })
        
        var currenttime = moment().format('YYYY/MM/DD | HH:MM:SS');

        db.add(`${target.id}-permanentrecord-kicks`, 1)
        db.push(`${target.id}-kicks`, `[${currenttime}] Kick: ${reason}`)
        
        target.kick({ reason: reason })

        interaction.reply({embeds: [new MessageEmbed().setColor('GREEN').setTitle('Success').setDescription(`Successfully kicked ${target.user.tag}.`).addField('Reason',reason)]})
    }
}