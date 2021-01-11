const Discord = require('discord.js');
const db = require('quick.db');
const ms = require("parse-ms");
const randomstring = require("randomstring");

module.exports = {
    config: {
        name: "set",
        description: "Set Ticket Topics",
        usage: "!ban",
        category: "ticket",
        accessableby: "",
        aliases: ["s"]
    },
    run: async (bot, message, args) => {
      
      const ticket = new db.table("TICKET_SYSTEM")

      let notallowed = new Discord.MessageEmbed()
          .setColor('#e64b0e')
          .setDescription(`You Don't Have Permission To Do This`)

      const { permCheck } = require('../../functions.js')
      let perm = permCheck(message, false, 'tickettopic')
      if(perm === false) return message.channel.send(notallowed);


      let permembed = new Discord.MessageEmbed()
          .setColor('#e64b0e')
          .setDescription(`Error. Give Me The Permission: Manage Channels`)

      if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(permembed);

      ticket.set(`${message.guild.id}-topic1`, args.join(" ").slice(2))

          const type = args[0]
          switch(type){

            case "1":
              top1 = args.slice(1).join(" ")
              ticket.set(`${message.guild.id}-topic1`, top1)
              message.channel.send(`Setted Topic-1 as ${top1}`)
            break;

            case "2":
              top2 = args.slice(1).join(" ")
              ticket.set(`${message.guild.id}-topic2`, top2)
              message.channel.send(`Setted Topic-2 as ${top2}`)
            break;

            case "3":
              top3 = args.slice(1).join(" ")
              ticket.set(`${message.guild.id}-topic3`, top3)
              message.channel.send(`Setted Topic-3 as ${top3}`)
            break;

            case "4":
              top4 = args.slice(1).join(" ")
              ticket.set(`${message.guild.id}-topic4`, top4)
              message.channel.send(`Setted Topic-4 as ${top4}`)
            break;

            case "5":
              top5 = args.slice(1).join(" ")
              ticket.set(`${message.guild.id}-topic5`, top5)
              message.channel.send(`Setted Topic-5 as ${top5}`)  
            break;

            default:
              message.channel.send("Please enter a topic number and then topic. Example `?set 1 User Complain`")



          }

    }
}