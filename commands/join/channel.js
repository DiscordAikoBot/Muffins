const { MessageEmbed } = require("discord.js")
const { redlight } = require("../../colours.json");
const db = require('quick.db')

module.exports = {
    config: {
        name: "joinchannel",
        description: "Sets the channel to send join messages to",
        usage: "(channel)",
        category: "settings",
        accessableby: "Moderator"
    },
    run: async (bot, message, args) => {

    const { permCheck } = require('../../functions.js');
    let perm = permCheck(message, false, 'joinchannel')
    if(perm === false) return message.channel.send('You do not have permissions!')

      let role = message.guild.channels.cache.find(r => r.name == args[0]) || message.guild.channels.cache.find(r => r.id == args[1]) || message.mentions.channels.first()
      if(!role) return message.channel.send("Please provide a channel to send the welcome message.")

      db.set(`settings.${message.guild.id}.joinchannel`, role.id)

      let embed = new MessageEmbed()
      .setColor(redlight)
      .setTitle(`Updated Settings`)
      .setDescription('Updated channel')
      message.channel.send(embed)
    }
}