const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    config: {
        name: "ticketrole",
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
    let perm = permCheck(message, false, 'ticketrole')
    if(perm === false) return message.channel.send(notallowed);

    let role = message.guild.roles.cache.find(r => r.name == args[0]) || message.guild.roles.cache.find(r => r.id == args[0]) || message.mentions.roles.first()

    if(!role) return message.channel.send('Please specify the role you want to give access to support tickets!')

    let sry = db.get(`${message.guild.id}-ticketrole`) || []
    sry.push(role.id)

    db.set(`${message.guild.id}-ticketrole`, sry)

    let channelsend = new Discord.MessageEmbed()
      .setColor('#e64b0e')
      .setTitle(`Added User`)
      .setDescription(`The role now has permission to see any new ticket made!`)

      message.channel.send(channelsend)
    }
}