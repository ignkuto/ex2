const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageSelectMenu} = require('discord.js');

const { readdirSync } = require('fs')

module.exports = {
    name: 'help',
    description: 'Lists all bot commands.',
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction
     */
    execute(client, interaction) {

        const main = new MessageEmbed()
            .setColor('BLURPLE')
            .setDescription('Please choose from the categories below.\n**NOTE: `[] = Required, () = Optional.`**')
            .addField('**`Utility`**', 'All utility commands.', true)
            .addField('**`Moderation`**', 'All moderation commands.', true)
            .addField('**`Fun`**', 'all fun commands.', true)
            .addField('**`Tutorial`**', 'all tutorial commands.', true)
            .addField('**`Leveling`**', 'all leveling commands.', true)
            .addField('**`Support`**', 'all support commands.', true)
        
        const utility = new MessageEmbed()
            .setColor('BLURPLE')
            .setTitle('Utility Commands')
            .setTimestamp()
            .addField('**`help`**', 'Displays this message.', true)
            .addField('**`ping (user)`**', 'Sends API & User latency.', true)

        const moderation = new MessageEmbed()
            .setColor('BLURPLE')
            .setTitle('Moderation Commands')
            .setTimestamp()
            .addField('**`ban [user] [r] [m]`**', 'ban a member.', true)
            .addField('**`tempban [user] [l] [r] [m]`**', 'temporarily ban a member.', true)
            .addField('**`kick [user] [r]`**', 'kick a member.', true)

        const fun = new MessageEmbed()
            .setColor('BLURPLE')
            .setTitle('Fun Commands')
            .setTimestamp()
            .addField('**`hug [user]`**', 'hug a member.', true)

        const tutorial = new MessageEmbed()
            .setColor('BLURPLE')
            .setTitle('Tutorial Commands')
            .setTimestamp()
            .addField('**`tutorial [int]`**', 'get a tutorial.', true)
        
        const leveling = new MessageEmbed()
            .setColor('BLURPLE')
            .setTitle('Leveling Commands')
            .setTimestamp()
            .addField('**`level (user)`**', 'display user level.', true)
        
        const support = new MessageEmbed()
            .setColor('BLURPLE')
            .setTitle('Support Commands')
            .setTimestamp()
            .addField('**`ticket`**', 'open a ticket.', true)

        const select = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('select')
                .setPlaceholder('Select a Category')
                .addOptions([
                    {
                        label: 'Utility',
                        description: 'Utility Commands & Features',
                        value: 'first_option',
                        setCustomId: 'first_option',
                        emoji: '🔧'
                    },
                    {
                        label: 'Moderation',
                        description: 'Moderation Commands & Features',
                        value: 'second_option',
                        setCustomId: 'second_option',
                        emoji: '🔨'
                    },
                    {
                        label: 'Fun',
                        description: 'Fun Commands & Features',
                        value: 'third_option',
                        setCustomId: 'third_option',
                        emoji: '🎆'
                    },
                    {
                        label: 'Tutorial',
                        description: 'Tutorial Commands & Features',
                        value: 'fourth_option',
                        setCustomId: 'fourth_option',
                        emoji: '🆘'
                    },
                    {
                        label: 'Leveling',
                        description: 'Leveling Commands & Features',
                        value: 'fifth_option',
                        setCustomId: 'fifth_option',
                        emoji: '💬'
                    },
                    {
                        label: 'Support',
                        description: 'Support Commands & Features',
                        value: 'sixth_option',
                        setCustomId: 'sixth_option',
                        emoji: '❓',
                    },
                ]),
        );

        if(interaction.user == '588236633535676416') {interaction.reply({embeds: [main], components: [select], ephemeral: false})} else {const embed = new MessageEmbed().setColor('DARK_RED').setTitle('Error').setDescription('Sorry, this command is disabled. Please read <#879839359803744308>');interaction.reply({embeds: [embed], ephemeral: true})}

        client.on('interactionCreate', async(int) => {
            if(int.isSelectMenu()) {
                if(int.values == 'first_option') {
                    interaction.followUp({embeds: [utility], ephemeral: true})
                    int.deferUpdate();
                }
                if(int.values == 'second_option') {
                    interaction.followUp({embeds: [moderation], ephemeral: true})
                    int.deferUpdate();
                }
                if(int.values == 'third_option') {
                    interaction.followUp({embeds: [fun], ephemeral: true})
                    int.deferUpdate();
                }
                if(int.values == 'fourth_option') {
                    interaction.followUp({embeds: [tutorial], ephemeral: true})
                    int.deferUpdate();
                }
                if(int.values == 'fifth_option') {
                    interaction.followUp({embeds: [leveling], ephemeral: true})
                    int.deferUpdate();
                }
                if(int.values == 'sixth_option') {
                    interaction.followUp({embeds: [support], ephemeral: true})
                    int.deferUpdate();
                }
            }
        });
    }
}