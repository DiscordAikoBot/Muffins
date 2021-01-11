const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

module.exports = (bot, reaction, user) => {

  if(reaction.bot) return;

  let messageid = reaction.message.id

  let guilds = reaction.message.channel.guild
  

  let guild = bot.guilds.cache.get(guilds.id)


  let check = db.get(`reactionroles.${guild.id}.${messageid}`)
  if(check) {

  if(reaction.emoji.name === check.reaction) {

  let mem = guild.members.cache.get(user.id)

  let role = guild.roles.cache.get(check.role)

  let roleCheck = mem.roles.cache.has(check.role)
  if(!roleCheck) {
    mem.roles.add(role).catch(e => {
    })

    let embed = new MessageEmbed()
    .setColor('#1df2af')
    .setTitle('Role Added')
    .setDescription(`The role ${role.name} has been added to you in ${guild.name}`)
    mem.send(embed).catch(e => {
    
    })
  }





  }




   } else {

     const Discord = require('discord.js');
    const ms = require("parse-ms");
    const randomstring = require("randomstring");
    const date = require('date-and-time');
    const hastebin = require('hastebin');

    if(reaction.bot) return;

     if(!db.get(`${messageid}`)) return;

    const ticket = new db.table("TICKET_SYSTEM");

  const user2 = guild.members.cache.get(user.id)

  const check = ticket.fetch(`${guild.id}_${user2.id}`)
  if(check) return user2.send({embed: {color:"RED", description:`You already have a ticket opened - <#${check}>`}})
  const numbers = randomstring.generate({
    length: 5,
    charset: 'numeric'
  });

  const authorsend2 = new Discord.MessageEmbed()
    .setColor('#e64b0e')
    .setDescription(`You already have a ticket open`)


  ticket.add(`${guild.id}-ticketcount`, 1)
  ticket.set(guild.id, {
    no: numbers,
    ticketopener: user2.id,
  });

  const ticketcount = ticket.fetch(`${guild.id}-ticketcount`)

  const channelsend1 = new Discord.MessageEmbed()
    .setColor('#e64b0e')
    .setTitle(`Support Ticket: ${ticketcount}`)
    .setDescription(`Hello ${user2},\n\nThank you for making a ticket. The support team will help you as soon as they can.`)

  const categoryName = "TICKETS";
  let category = guild.channels.cache.find(channel => channel.type === "category" && channel.name === categoryName);
  if(!category) {
    guild.channels.create("TICKETS", {
      type: 'category'
    })
    category = guild.channels.cache.find(channel => channel.type === "category" && channel.name === categoryName);
  }
  const ticketlog = ticket.get(`${guild.id}_ticketlog`)
  const logchannel = bot.channels.cache.get(ticketlog);
  const role = db.get(`${guild.id}-ticketrole`)

            var name = `ticket-${numbers}`;
            guild.channels.create(name, {
                type: 'text',
                parent: category,
                permissionOverwrites: [
                  {
                    id: guild.roles.everyone,
                    deny: ['VIEW_CHANNEL'],
                  },
                  {
                    id: user2.id,
                    allow: ['VIEW_CHANNEL',
                            'SEND_MESSAGES',
                            'READ_MESSAGE_HISTORY'               
                          ]
                  },
                  {
                    id: user2.id,
                    deny: ['MENTION_EVERYONE']
                  },
                ],
              }).then(createdchannel => { 

                createdchannel.send(channelsend1)
                createdchannel.setTopic(`Support Ticket ${numbers} - ${user2.username}`)
                ticket.set(`${guild.id}_${user2.name}`, createdchannel.id)
                const chname = createdchannel.id

                  role.forEach(x => {
                    let y = guild.roles.cache.find(r => r.id === x);
                    if(!y) return;
                    
                    createdchannel.updateOverwrite(y, { VIEW_CHANNEL: true})
                  }).catch(e => {})
                
              })
  }
}