const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    config: {
        name: "ticketlog",
        description: "Add a role to check tickets",
        usage: "(role)",
        category: "ticket",
        accessableby: ""
    },
    run: async (bot, message, args) => {

    let notallowed = new Discord.MessageEmbed()
    .setColor('#e64b0e')
    .setDescription(`You Don't Have Permission To Do This`)

    const { permCheck } = require('../../functions.js')
    let perm = permCheck(message, false, 'ticketlog')
    if(perm === false) return message.channel.send(notallowed);

    let ch = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

    if(!ch) return message.channel.send('Please specify the channel you want to log tickets in!')
    const ticket = new db.table("TICKET_SYSTEM")
    ticket.set(`${message.guild.id}_ticketlog`, ch.id)

    let channelsend = new Discord.MessageEmbed()
      .setColor('#e64b0e')
      .setTitle(`Added User`)
      .setDescription(`The channel <#${ch}> will now log ticket logs`)

      message.channel.send(channelsend)
    }
}

