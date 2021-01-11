const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../botconfig.json");
const { cyan } = require("../../colours.json")
const db = require('quick.db')

module.exports = {
    config: {
        name: "suggestchnl",
        aliases: ["suggestchannel", "suggestionchannel", "suggestionchnl"],
        usage: "(channel)",
        category: "settings",
        description: "Change suggestion channel",
        accessableby: "Moderators"
    },
    run: async (bot, message, args) => {

      let chnl = message.guild.channels.cache.find(r => r.name == args[0]) || message.guild.channels.cache.find(r => r.id == args[0]) || message.mentions.channels.first()
      if(!chnl) return message.channel.send("Please provide the channel to use for suggestions") 


      db.set(`suggestions.channel`, chnl.id)

      message.channel.send(`Suggestion channel updated.`)

    }
}