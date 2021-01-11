const { MessageEmbed } = require("discord.js")
const { aqua } = require("../../colours.json");
const db = require('quick.db');
const { permCheck } = require('../../functions.js');

module.exports = {
    config: {
        name: "modlog",
        description: "Sets role to give to users when they join!",
        usage: "(role)",
        category: "settings",
        accessableby: "Administrators",
        aliases: ["punishmentlog", "modlogger"]
    },
    run: async (bot, message, args) => {
      
      let perm = permCheck(message, false, 'modlog')
      if(perm === false) return message.channel.send('You do not have permissions!')
        
      let chnl = message.guild.channels.cache.find(r => r.name == args[0]) || message.guild.channels.cache.find(r => r.id == args[0]) || message.mentions.channels.first()
      if(!chnl) return message.channel.send("Please provide the channel to log punishments to!") 
      
      db.set(`data.${message.guild.id}.modlog`, chnl.id)
      message.channel.send('Modlog channel has been updated/set!')
    }
}