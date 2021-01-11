const db = require('quick.db')

module.exports = {
  config: {
    name: "permadd",
    description: "Gives a role permission to run a certain command",
    usage: "(command) (role)",
    category: "moderation",
    accessableby: "Moderator",
    aliases: ["permissionadd"]
  },
  run: async (bot, message, args) => {

    if(!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send("You do not have permission to perform this command!")

    let blacklist = args[0]
    if (!blacklist) return message.channel.send('Please Specify the command to add perms to.');
    blacklist = blacklist.toLowerCase()

    let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()

    let array = ["warn", "ban", "unwarn", "warns", "addrole", "clear", "kick", "mute", "prefix", "puns", "removerole", "say", "slowmode", "tempban", "unban", "unmute", "reactionrole", "blacklist", "blacklistlist", "unblacklist", "joinchannel", "joinrole"]

    let c = false

    array.forEach(x => {
      if(blacklist === x) {
        c = true
      }
    })

    

    


    if(c === false) {

      let r = array.join(', ')
      message.channel.send(`The command must be one of these: ${r}`)


    } else {

      if(!role) return message.channel.send("Please provide a role to give access to this command.");


      db.push(`${blacklist}.perms.${message.guild.id}`, role.id)

      message.channel.send('Command\'s permission has been set.')
      return;
    }
  }
}