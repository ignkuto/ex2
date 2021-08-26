const { Client, CommandInteraction, MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: "guildMemberAdd",
    execute(member) {
        const role = member.guild.roles.cache.get('880251597517619210')

        if(db.get(`${member.id}-muted`) == true)
        member.roles.add(role)
    }
}
