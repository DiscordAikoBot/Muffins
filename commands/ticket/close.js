const Discord = require('discord.js');
const db = require('quick.db');
const date = require('date-and-time')
const hastebin = require('hastebin')


module.exports = {
    config: {
        name: "close",
        description: "Close a ticket",
        usage: "close",
        category: "ticekt",
        accessableby: "",
        aliases: ["cl"]
    },
    run: async (bot, message, args) => {

        
  const ticket = new db.table("TICKET_SYSTEM");
  const channel = message.channel;

  const whoopsembed = new Discord.MessageEmbed()
    .setColor('#e64b0e')
    .setDescription(`Ticket Is Already Closed`)

  if(channel.parent == message.guild.channels.cache.find(c => c.name == "Closed Tickets" && c.type == "category")) return message.channel.send(whoopsembed)

  let ticketcount = ticket.fetch(`${message.guild.id}-ticketcount`)

  let reason = args.join(" ");
  if(!reason) reason = 'None Provided'

  let user = ticket.fetch(`${message.guild.id}.ticketopener`);
  const u = message.guild.members.cache.get(user);

  message.channel.messages.fetch()
  .then(messages => {
    let text = "";

  for (let [key, value] of messages) {
        const now = new Date();
      let dateString = `${date.format(now, 'YYYY/MM/DD HH:mm:ss', true)}`;

      text += `${dateString} | ${value.author.tag}: ${value.content}\n`;
  }

  hastebin.createPaste(text, {
          raw: true,
          contentType: 'text/plain',
          server: 'https://hastebin.com'

      })
      .then(data => {
          const authorsend = new Discord.MessageEmbed()
            .setColor('#e64b0e')
            .setDescription(`[Message Transcript](${data}) Of Your Ticket In **${message.guild.name}**`)
        
          u.send(authorsend)

          let closedticket = new Discord.MessageEmbed()
            .setColor('#e64b0e')
            .setDescription(`Ticket Closed. This Ticket Will Be Deleted In 30 seconds.\n\n[Ticket Transcript](${data}).`)

    const logchannelembed = new Discord.MessageEmbed()
        .setColor('#e64b0e')
        .setTitle(`Ticket Closed`)
        .addField("Ticket By:", u)
        .addField("Closed By:", message.author.username)
        .addField("Ticket Number:", `\`${ticketcount}\``)
        .addField("Close Reason:", `${reason ? reason: "*None*"}`)
        .addField("Transcript:", `[Here](${data})`)

    const logchannel = message.guild.channels.cache.find(cl => cl.name == "ticket-logs" && cl.type == "text")
    if(logchannel) {
    logchannel.send(logchannelembed);
    }
    ticket.delete(`${message.guild.id}_${message.author.name}`)  
    message.channel.send(closedticket);

    setTimeout(() => {
        message.channel.delete()
    }, 30000);

      })
  })

    }
}