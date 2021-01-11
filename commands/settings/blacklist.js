const db = require('quick.db')

module.exports = {
  config: {
    name: "blacklist",
    description: "Blacklists a word from being sent",
    usage: "(word)",
    category: "settings",
    accessableby: "Moderator"
  },
  run: async (bot, message, args) => {

    const { permCheck } = require('../../functions.js');
    let perm = permCheck(message, false, 'blacklist')
    if(perm === false) return message.channel.send('You do not have permissions!')

    let blacklist = args[0]
    if (!blacklist) return message.channel.send('Please Specify the word you want to blacklist!');
    blacklist = blacklist.toLowerCase()
    if(blacklist === "reset") {
      db.delete(`settings.${message.guild.id}.blacklist`)
      return message.channel.send('Blacklist has been reset');
    }

    let blacklistrn = db.get(`settings.${message.guild.id}.blacklist`)
    if(!blacklistrn) {
      db.push(`settings.${message.guild.id}.blacklist`, blacklist)
      return message.channel.send(`${blacklist} has been added to the blacklist`);
    }

    let check = false

    blacklistrn.forEach(x => {
      if(x === blacklist) {
        check = true
      }
    })

    if(check === true) return message.channel.send('This word is already added to the blacklist!');

    

    db.push(`settings.${message.guild.id}.blacklist`, blacklist)

    message.channel.send(`${blacklist} has been added to the blacklist`)
  }
}