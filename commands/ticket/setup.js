const Discord = require('discord.js');
const db = require('quick.db');
const rs = require('randomstring');

module.exports = {
    config: {
        name: "setup-ticket",
        description: "Setup ticket system",
        usage: "setup-ticket",
        category: "ticket",
        accessableby: "",
        aliases: ["su"]
    },
    run: async (bot, message, args) => {

    let notallowed = new Discord.MessageEmbed()
    .setColor('#e64b0e')
    .setDescription(`You Don't Have Permission To Do This`)

    const { permCheck } = require('../../functions.js')
    let perm = permCheck(message, false, 'ticketsetup')
    if(perm === false) return message.channel.send(notallowed);

    let setupcheck2 = new Discord.MessageEmbed()
    .setColor('#e64b0e')
    .setDescription(`This Server Has Already Been Setup`)


  message.guild.roles.create({
    data:{
      name: 'Support Team',
      color: 'BLUE',
      permissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS']
    }
  })
    .then(role => console.log(`Created new role with name ${role.name} and color ${role.color}`))
    .catch(console.error)

    let categorycreate = new Discord.MessageEmbed()
    .setColor('#e64b0e')
    .setTitle(`Server Setup Successfully`)
    .setDescription(`Support Team Role: **Support Team** | Open Ticket Category: **Tickets** | Closed Ticket Category: **Closed Tickets**`);

    message.guild.channels.create("TICKETS", { type: "category" })

    message.channel.send(categorycreate)

    const categoryName = "TICKET LOGS"

    const category = message.guild.channels.cache.find(channel => channel.type === "category" && channel.name === categoryName)
                || await message.guild.channels.create(categoryName, { type: "category" });

    const role = message.guild.roles.cache.find(r => r.name === "Support Team")

    var name = `ticket-logs`;
    message.guild.channels.create(name, {
        type: 'text',
        parent: category,
        setTopic: 'Ticket Logs Channel For Support Tickets Bot',
        permissionOverwrites: [
          {
            id: message.guild.roles.everyone,
            deny: ['VIEW_CHANNEL'],
          },
          {
            id: role.id,
            allow: ['VIEW_CHANNEL'],
          },
        ],
      });
  

      
    

    }
} 