const { MessageEmbed } = require("discord.js");
const { cyan } = require("../../colours.json")
const db = require('quick.db')

module.exports = {
    config: {
        name: "level",
        aliases: ["rank"],
        usage: "(command)",
        category: "levelling",
        description: "Displays your level",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
      const level = new db.table('LEVEL_SYSTEM');
      const toggle = level.fetch(`toggle_${message.guild.id}`); 

      const member = message.mentions.members.first() || message.guild.members.cache.find(u => u.id === args[0]) || message.member;

      if(toggle === 'on') {

        const levels = new db.table('level')
        let points = levels.get(`points.${message.guild.id}.${member.id}`) || 0;
        let rank = levels.get(`rank.${message.guild.id}.${member.id}`) || 1;
        if (!points) points = 0;
        if (!rank) rank = 0;
          let embed = new MessageEmbed() 
          .setColor("#ace9e7")
          .setTitle(`**${member.user.username} Level!**`)
          .setDescription(`You are level **${rank}** and have **${points}** points`)
          message.channel.send(embed);
        } else {
          message.channel.send("The levelling system on this server is turned off, please tell the server staffs to turn it on.")
        }

      }
}