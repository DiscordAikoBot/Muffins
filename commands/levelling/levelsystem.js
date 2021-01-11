const Discord = require("discord.js")
const { aqua } = require("../../colours.json");
const db = require('quick.db');
const { permCheck } = require('../../functions.js');

module.exports = {
    config: {
        name: "set-levelling",
        description: "Sets role to give to users when they join!",
        usage: "(role)",
        category: "levelling",
        accessableby: "Administrators",
        aliases: ["set-level"]
    },
    run: async (bot, message, args) => {


      const type = args[0];
            const level = new db.table('LEVEL_SYSTEM');
            
            const checking = level.fetch(`toggle_${message.guild.id}`);
            const role = new db.table("LEVEL_ROLES");
            switch(type) {

                case "toggle":
                    toggle = args.slice(1).join(" ");
                    if(!toggle) return message.channel.send({embed: {color:'#eb0936', description:"❌ Please mention on/off to turn on and off the level system respectively."}})
                    message.channel.send({embed: {color:'#10de47', description:`✅ The leveling system has been turned **${toggle.toUpperCase()}**.`}});
                    
                    level.set(`toggle_${message.guild.id}`, toggle)
                
                    break;      
                    
                case "channel":
                    const ch = message.mentions.channels.first();

                    if(!checking || checking === 'off') return message.channel.send({embed: {color:'#eb0936', description:"❌ Please toggle **ON** the level feature."}});
                    if(!ch) return message.channel.send({embed: {color:'#eb0936', description:"❌ Please enter the command responce."}})
                    
                    const levelchEmbed = new Discord.MessageEmbed()
                        .setAuthor("SETTED LEVEL CHANNEL")
                        .setColor('#10de47')
                        .setDescription(`Channel: ${ch} is set for sending level messages.`)
                    
                    message.channel.send(levelchEmbed);

                    level.set(`channel_${message.guild.id}`, ch.id)
                    
                    break;

                case "del-channel":
                    message.channel.send({embed: {color:'#10de47', description:`✅ Sucessfully deleted the **Level Message Channel** for the server ${message.guild.name}`}});

                    level.delete(`channel_${message.guild.id}`);

                    break;
                
                case "message":
                    const content = message.content.split(/ +/g).slice(2).join(" ");
                    if(!checking || checking === 'off') return message.channel.send({embed: {color:'#eb0936', description:"❌ Please toggle **ON** the level system."}});

                     const contentembed = new Discord.MessageEmbed()
                          .setColor('#eb0936')
                          .setDescription("❌ Please add a level message along with the tags for the level up message!")
                          .addField("Available Tags: ", `
                          {user} - mention the user.
                          {usertag} - show the username with discriminator.
                          {username} - show the username.
                          {userlevel} - tells the users level.`)
                    if(!content) return message.channel.send(contentembed);

                    const levelmsgEmbed = new Discord.MessageEmbed()
                        .setAuthor("SETTED LEVEL UP MESSAGE")
                        .setColor('#10de47')
                        .setDescription(`Setted level up message to:\n \`\`\`${content}\`\`\` `)
                    
                    message.channel.send(levelmsgEmbed);
                    level.set(`message_${message.guild.id}`, content)

                break;

                case "role":
                    const levels = args[1]
                    if (!levels || isNaN(levels)) return message.channel.send({embed: {color:'#eb0936', description:"❌ Please mention a level for which you want to assign a level role."}});

                    const mentionedRole = args.slice(2).join(" ");
                    const roles = message.mentions.roles.first()
                        || message.guild.roles.cache.get(mentionedRole)
                        || message.guild.roles.cache.find(r => r.name.toLowerCase() === mentionedRole.toLowerCase());

                    if (role.get(message.guild.id)) {
                        if (role.get(`${message.guild.id}.role`).find(role => role.role === role.id)) return message.channel.send({embed : {color:'#de2121', description:"❌ That role is already set for level role."}})
                    }

                    if(!role) return message.channel.send({embed : {color:'#de2121', description:"❌  Could not find the specified role."}})
                    
                    if(!checking || checking === 'off') return message.channel.send({embed: {color:'#eb0936', description:"❌ Please toggle **ON** the level system."}});

                    const has = role.has(message.guild.id)

                    const levelroleEmbed = new Discord.MessageEmbed()
                        .setAuthor("SETTED LEVEL ROLE")
                        .setColor('#10de47')
                        .setDescription(`Setted role: ${roles.name} for level: ${levels}`)

                    if(!has){
                      role.set(message.guild.id, [{role:roles.id, level:level}])
                      message.channel.send(levelroleEmbed);
                    } else {
                      role.set(message.guild.id, {role:roles.id, level:level})
                      message.channel.send(levelroleEmbed);
                    }
                    

                break;

                default :


                    const invalidEmbed = new Discord.MessageEmbed()
                        .setAuthor("LEVEL SYSTEM COMMAND", bot.user.displayAvatarURL({
                            format: "png",
                            dynamic: true,
                            size: 2048
                        }))
                        .setColor("#eb0936")
                        .setTitle("Invalid Arguments")
                        .setDescription(`**USAGE**\n\`\`\`set-level <module>\`\`\`\n**MODULES :** \`toggle\`, \`channel\`, \`message\`, \`role\``);
            
                    message.channel.send(invalidEmbed)
            }
    }
}