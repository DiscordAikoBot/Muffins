const Discord = require('discord.js');
const db = require('quick.db');


module.exports = {
    config: {
        name: "rename",
        description: "Rename Ticket",
        usage: "rename",
        category: "ticket",
        accessableby: "",
        aliases: ["rn"]
    },
    run: async (bot, message, args) => {

    const ticket = new db.table("TICKET_SYSTEM");
    let notallowed = new Discord.MessageEmbed()
    .setColor('#e64b0e')
    .setDescription(`You Need The **Support Team** Role To Rename Tickets`)

    const { permCheck } = require('../../functions.js')
    let perm = permCheck(message, false, 'ticketrename')
    if(perm === false) return message.channel.send(notallowed);

    const numbers = ticket.fetch(`${message.guild.id}.no`)

    const authorsend2 = new Discord.MessageEmbed()
      .setColor('#e64b0e')
      .setDescription(`Input something to rename the ticket to`)

    const rename = args.join(" ");
    if(!rename) return message.channel.send(authorsend2)

      message.channel.setName(`${rename}-${numbers}`)

    ticket.set(`${message.guild.id}_${message.author.name}`, message.channel.id)

    let embed = new Discord.MessageEmbed()
      .setColor('#e64b0e')
      .setDescription(`Ticket renamed to ${rename}`)
    message.channel.send(embed)


    }
}