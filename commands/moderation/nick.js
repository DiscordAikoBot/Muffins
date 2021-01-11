const { MessageEmbed } = require("discord.js")
const { redlight } = require("../../colours.json");

module.exports = {
    config: {
        name: "nick",
        description: "Change your nick!",
        usage: "(nickname)",
        category: "moderation",
        accessableby: "Moderator",
        aliases: ["nickname"]
    },
    run: async (bot, message, args) => {
      
      
    let kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if(kickMember !== message.member) {
      if(!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.channel.send("You do not have permission to perform this command on other players, To run on yourself do !nick (Nickname)");
    }
    
    if(kickMember == message.member) {
      let nick = args.slice(0).join(" ")
      if(!nick) return message.channel.send('Please specify the nickname!')
      kickMember.setNickname(nick)

    message.channel.send('Done')
    } else {
      let nick = args.slice(1).join(" ")
      if(!nick) return message.channel.send('Please specify the nickname!')
      kickMember.setNickname(nick)

    message.channel.send('Done')
    }
    

    
    }
}