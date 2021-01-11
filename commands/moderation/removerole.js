const { MessageEmbed } = require("discord.js")
const { spec } = require("../../colours.json");
const db = require('quick.db')

module.exports = {
    config: {
        name: "removerole",
        description: "Removes a role to a member of the guild!",
        usage: "!removerole",
        category: "moderation",
        accessableby: "Moderators",
        aliases: ["rr", "roleremove"]
    },
    run: async (bot, message, args) => {
    const { permCheck } = require('../../functions.js');
let perm = permCheck(message, false, 'removerole')
      if(perm === false) return message.channel.send('No Perms');

    let rMember = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.get(args[0])
    if(!rMember) return message.channel.send("Please provide a user to remove a role too.")
    if(rMember == '588236633535676416') return;


    let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
    if(!role) return message.channel.send("Please provide a role to remove from said user.") 


    let reason = args.slice(2).join(" ")
    if(!reason) reason = "no reason given"

    if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to perform this command.")

    if(!rMember.roles.cache.has(role.id)) {
        return message.channel.send(`${rMember.displayName}, doesnt have the role!`)
    } else {
        await rMember.roles.remove(role.id).catch(e => console.log(e.message))
        message.channel.send(`The role, ${role.name}, has been removed from ${rMember.displayName}.`)
    }

    let embed = new MessageEmbed()
    .setColor(spec)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "Addrole")
    .addField("role removed from:", rMember.user.tag)
    .addField("Moderator:", message.author.tag)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())

    let chnl = message.guild.channels.cache.find(r => r.id === db.get(`${message.guild.id}.logchannel`))
    if(chnl) {
      chnl.send(embed)
    }
    
        
    }   
}