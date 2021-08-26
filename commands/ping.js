const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Sends API & User latency.',
    execute(client, interaction) {
        const embed = new MessageEmbed()
            .setColor('BLURPLE')
            .setTitle('Ping :ping_pong:')
            .setDescription(`**API Latency (Ping):** ${client.ws.ping}ms\n**Your Latency (Ping):** ${Date.now() - interaction.createdTimestamp}ms`)
        interaction.reply({ embeds: [embed], ephemeral: true });
    }
}