const Discord = require('discord.js');
const db = require('quick.db');
const rs = require('randomstring');

module.exports = {
    config: {
        name: "remove",
        description: "Remove a member from ticket",
        usage: "remove <user>",
        category: "ticket",
        accessableby: "",
        aliases: ["r"]
    },
    run: async (bot, message, args) => {
      
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    
    const notallowed = new Discord.MessageEmbed()
      .setColor('#e64b0e')
      .setDescription(`You Need The **Support Team** Role To Remove Users From Tickets`)

    const { permCheck } = require('../../functions.js')
    let perm = permCheck(message, false, 'ticketremove')
    if(perm === false) return message.channel.send(notallowed);

    const channelsend = new Discord.MessageEmbed()
      .setColor('#e64b0e')
      .setTitle(`Removed User`)
      .setDescription(`${message.author} Has Removed ${user} From This Ticket`)


    message.channel.updateOverwrite(user, {
      'VIEW_CHANNEL': false, 
      'SEND_MESSAGES': false, 
      'MENTION_EVERYONE': false
      })
    message.channel.send(channelsend)

    }
}