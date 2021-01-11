const { MessageEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");
const db = require('quick.db');

module.exports = async (bot, member) => {

  let role = db.get(`data.${member.guild.id}.joinrole`)
  if (!role) {
     console.log(`No Join role added in guild ${member.guild.name}`)
  } else {
   let rolething = member.guild.roles.cache.get(role)
   if(rolething) {
    member.roles.add(rolething)
   }
  }
      
      let welcomeChannel = db.get(`settings.${member.guild.id}.joinchannel`)
      if(!welcomeChannel) return;
      let sdds = member.guild.channels.cache.find(r => r.id === welcomeChannel)
      if(!sdds) return;
      sdds.send(`${member.user}`).then(y => {
        setTimeout(function() {y.delete()}, 10000)
      })
}
