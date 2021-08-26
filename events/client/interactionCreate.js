const { Client, CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
    name: "interactionCreate",
     /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        if (interaction.isCommand()) {

            const command = client.commands.get(interaction.commandName);

            if (!command) return interaction.reply({content: "This command no longer exists."}) &&     
            client.commands.delete(interaction.commandName);
            
            command.execute(client, interaction);
        }
        if (interaction.isButton) {
            if(interaction.customId == 'verificationbutton') {
                const role = interaction.guild.roles.cache.get("879874818089041960")
                const member = interaction.member
                interaction.reply({content: 'Success! Verifying now.', ephemeral: true}).then(
                setTimeout(() => {
                    interaction.editReply({content: 'Success! Verifying now..', ephemeral: true})
                }, 1000),
                setTimeout(() => {
                    interaction.editReply({content: 'Success! Verifying now...', ephemeral: true})
                }, 1000),
                setTimeout(() => {
                    member.roles.add(role)
                }, 3000)
                )
            } 
        }
    }
}