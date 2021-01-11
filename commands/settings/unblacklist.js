const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

module.exports = {
  config: {
    name: "unblacklist",
    description: "Blacklists a word from being sent",
    usage: "(word)",
    category: "settings",
    accessableby: "Moderator",
    aliases: ["blacklistremove", "removeblacklist"]
  },
  run: async (bot, message, args) => {

    const { permCheck } = require('../../functions.js');
    let perm = permCheck(message, false, 'unblacklist')
    if(perm === false) return message.channel.send('You do not have permissions!')

    let invalidEmbed = new MessageEmbed()
    .setAuthor("Aiko", bot.user.displayAvatarURL({
                  format: "png",
                  dynamic: true,
                  size: 2048
              }))
    .setColor("#eb0936")
    .setTitle('Invalid unblacklist usage')
    .addFields({
                  name: "USAGE",
                  value: "```unblacklist (word)```"
              })


    let errorEmbed = new MessageEmbed()
    .setAuthor("Aiko", bot.user.displayAvatarURL({
                  format: "png",
                  dynamic: true,
                  size: 2048
              }))
    .setColor("#eb0936")
    .setTitle('Error')
    .addFields({
                  name: "Not blacklisted",
                  value: "```This word is not blacklisted!```"
              })

    let blacklist = args[0]
    if (!blacklist) return message.channel.send(invalidEmbed);

    blacklist = blacklist.toLowerCase()

    let blacklistrn = db.get(`settings.${message.guild.id}.blacklist`)
    if(!blacklistrn) {
      db.push(`settings.${message.guild.id}.blacklist`, blacklist)
      return message.channel.send(`This server doesn't have a blacklist!`);
    }

    let check = false

    blacklistrn.forEach(x => {
      if(x === blacklist) {
        check = true
      }
    })

    if(check === false) return message.channel.send(errorEmbed);

    let su = blacklistrn.filter(s => s !== blacklist)


    if(su.length < 1) {
      db.delete(`settings.${message.guild.id}.blacklist`)
    } else {
      db.set(`settings.${message.guild.id}.blacklist`, su)
    }
    

    message.channel.send(`${blacklist} has been removed from the blacklist.`)
  }
}