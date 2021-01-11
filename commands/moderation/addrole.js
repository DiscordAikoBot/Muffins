const { MessageEmbed } = require("discord.js")
const { spec } = require("../../color.json")
const db = require('quick.db')

module.exports= {
    config: {
        name: "addrole",
        description: "Adds a role to a member of the guild!",
        usage: "!addrole",
        category: "moderation",
        accessableby: "Moderators",
        aliases: ["ar", "roleadd"]
    },
    run: async (bot, message, args) => {

    const { permCheck } = require('../../functions.js');
    let perm = permCheck(message, false, 'addrole')
      if(perm === false) return message.channel.send('No Perms');

    let rMember = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.get(args[0])
    if(!rMember) return message.channel.send("Please provide a user to add a role too.")


    let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
    if(!role) return message.channel.send("Please provide a role to add to said user.")

    if(message.member.roles.highest.comparePositionTo(role) < 0) return message.channel.send('You cannot give a role higher than your highest role!');


    let reason = args.slice(2).join(" ")
    if(!reason) reason = "No reason set."

    if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to perform this command.")

    if(rMember.roles.cache.has(role.id)) {
        return message.channel.send(`${rMember.displayName}, already has the role!`)
    } else {
        await rMember.roles.add(role.id).catch(e => console.log(e.message))
        message.channel.send(`The role, ${role.name}, has been added to ${rMember.displayName}.`)
    }

    let embed = new MessageEmbed()
        .setColor(green)
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "Addrole")
        .addField("Added to:", rMember.user.tag)
        .addField("Moderator:", message.author.tag)
        .addField("Reason:", reason)
        .setTimestamp()
    
        let chnl = message.guild.channels.cache.find(r => r.id === db.get(`data.${message.guild.id}.modlog`))
        if(chnl) {
          chnl.send(embed)
        }
    }
}
