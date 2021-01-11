const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../botconfig.json");
const { cyan } = require("../../colours.json")
const db = require('quick.db')

module.exports = {
    config: {
        name: "suggestchnlremove",
        aliases: ["suggestchannelremove", "suggestionchannelremove", "suggestionchnlremove"],
        usage: "(channel)",
        category: "settings",
        description: "Change suggestion channel",
        accessableby: "Moderators"
    },
    run: async (bot, message, args) => {


      db.delete(`suggestions.channel`)

      message.channel.send(`Suggestion channel deleted.`)

    }
}