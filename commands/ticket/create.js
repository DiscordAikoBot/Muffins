const Discord = require('discord.js');
const db = require('quick.db');
const ms = require("parse-ms");
const randomstring = require("randomstring");
const date = require('date-and-time');
const hastebin = require('hastebin');

module.exports = {
    config: {
        name: "create",
        description: "Creates a ticket",
        usage: "create",
        category: "ticket",
        accessableby: "",
        aliases: ["cr"]
    },
    run: async (bot, message, args) => {

      

      let embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle('Tickets')
      .setDescription('React to this message to open a support ticket!')
      message.channel.send(embed).then(y => {
        y.react('📧')
        db.set(`${y.id}`, true)
      })

    }
}

            