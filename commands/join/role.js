const { MessageEmbed } = require("discord.js")
const { aqua } = require("../../colours.json");
const db = require('quick.db');

module.exports = {
    config: {
        name: "joinrole",
        description: "Sets role to give to users when they join!",
        usage: "(role)",
        category: "settings",
        accessableby: "Administrators"
    },
    run: async (bot, message, args) => {

    const { permCheck } = require('../../functions.js');
    let perm = permCheck(message, false, 'joinrole')
    if(perm === false) return message.channel.send('You do not have permissions!')
    
      let role = message.guild.roles.cache.find(r => r.name == args[0]) || message.guild.roles.cache.find(r => r.id == args[0]) || message.mentions.roles.first()
      if(!role) return message.channel.send("Please provide a role to add to give to people who join.") 
      
      db.set(`data.${message.guild.id}.joinrole`, role.id)
      message.channel.send('Join Role has been updated/set')
    }
}