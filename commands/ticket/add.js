const Discord = require('discord.js');
const db = require('quick.db');
const rs = require('randomstring');

module.exports = {
    config: {
        name: "add",
        description: "Add a member in ticket channel",
        usage: "add",
        category: "ticket",
        accessableby: "",
        aliases: ["a"]
    },
    run: async (bot, message, args) => {
 

    const notallowed = new Discord.MessageEmbed()
      .setColor('#e64b0e')
      .setDescription(`You Don't have permission to add users to ths ticket!`)

    const { permCheck } = require('../../functions.js')
    let perm = permCheck(message, false, 'ticketadd')
    if(perm === false) return message.channel.send(notallowed);

    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) return message.channel.send('Please specify the user!')

    let channelsend = new Discord.MessageEmbed()
      .setColor('#e64b0e')
      .setTitle(`Added User`)
      .setDescription(`${message.author} Has Added ${user} To This Ticket`)


    message.channel.updateOverwrite(user, {
      'VIEW_CHANNEL': true, 
      'SEND_MESSAGES': true, 
      'MENTION_EVERYONE': false
    })
    message.channel.send(channelsend)


    }
}