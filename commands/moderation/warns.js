const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../botconfig.json");
const { cyan } = require("../../colours.json")
const db = require("quick.db");

module.exports = {
    config: {
        name: "warns",
        aliases: ["checkwarns"],
        usage: "(command)",
        category: "moderation",
        description: "Displays your level",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
      
      const { permCheck } = require('../../functions.js');
      
      let perm = permCheck(message, false, 'warns')
      if(perm === false) return message.channel.send('No Perms');
     
      
      let warnee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if(!warnee) return message.channel.send("Please supply a user to check his warns");
      
        let embed = new MessageEmbed() 
        .setColor("#ace9e7")
        .setTitle(`**${warnee.user.username}'s Warns**`)

        let array = db.get(`${message.guild.id}.${warnee.id}.warns`)
        if(!array) {
          embed.setDescription('No Warns')
          return message.channel.send(embed);
        }

        let est = ""
        let i = 0
        let arrayLength = array.length + 1

        array.forEach(x => {
          i++
          est = `${est}\n${i} - ${x}`
          if(i == array.length) {
            embed.setDescription(est)
            message.channel.send(embed)
          }
        })
    }
}