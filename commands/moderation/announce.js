const { MessageEmbed } = require('discord.js');
const { spec, green_light } = require('../../colours.json');
const db = require('quick.db')
const toHex = require('colornames')

module.exports = { 
    config: {
        name: "announce",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        if(!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send("You do not have permission to perform this command!");
        
        const embed = new MessageEmbed()
          .setTitle("")

        const sent = await message.channel.send(embed)

        message.channel.send('Please Send the title')

        const filter = m => m.author.id === message.author.id;
        const collector = message.channel.createMessageCollector(filter, { max: 1, time: 150000 });

        collector.on('collect', m => {
          embed.setTitle(m)
          sent.edit(embed)
        })

        collector.on('end', collected => {
          if(!collected.size > 0) {
            message.channel.send('Response Timed out please redo the command')
          } else {

            //
            //    START EMBED DESCRIPTION 
            //

            const filter = m => m.author.id === message.author.id;
            const collector = message.channel.createMessageCollector(filter, { max: 1, time: 150000 });

            message.channel.send('Please Send the body!')
          
          collector.on('collect', m => {
            
            let str = m.content
            embed.setDescription(str)
            
            sent.edit(embed)
          })

          collector.on('end', collected => {
            if(!collected.size > 0) {
              message.channel.send('Response Timed out please redo the command')
            } else {
              //
              //      Color choice
              //

              message.channel.send('Please input the color name. All colors can be found here: https://www.npmjs.com/package/colornames#complete-color-map')

              const filter = m => m.author.id === message.author.id;
            const collector = message.channel.createMessageCollector(filter, { max: 1, time: 150000 });

            message.channel.send('Please Send the body!')
          
          collector.on('collect', m => {

            let color = toHex(m.content)
            if(!color) return message.channel.send('Invalid try again using one of the colors found in this link https://www.npmjs.com/package/colornames#complete-color-map');
            embed.setColor(color)
          })

          collector.on('end', collected => {
            if(!collected.size > 0) {
              message.channel.send('Response Timed out please redo the command')
            } else {
              message.channel.send(embed)
              const filter = m => m.author.id === message.author.id;
            const collector = message.channel.createMessageCollector(filter, { max: 1, time: 150000 });

            message.channel.send('Please Mention the channel you want to send the message to!')
          
          collector.on('collect', m => {

            let channel = m.mentions.channels.first()
            if(!channel) return message.channel.send('Invalid channel please try again by rerunning the command')
            channel.send(embed)
            
          })

          collector.on('end', collected => {
            if(!collected.size > 0) return message.channel.send('Response Timed out please redo the command');
            })
              //
              //    END
              //
            }
          })
          }
        })

    }
        })
    }
}