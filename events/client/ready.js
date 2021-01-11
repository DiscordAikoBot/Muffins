const fetch = require("node-fetch")
const db = require('quick.db');
const { GiveawaysManager } = require("discord-giveaways");


module.exports = bot => {

   
    console.log(`${bot.user.tag} is online`);
    
    
    db.delete(`limit`)

    

    bot.user.setPresence({
            status: 'online',
            activity: {
                name: '?help | Trapping Muffins',
               type: 'WATCHING'
            }
       })

       function resetBot() {
        bot.destroy()
      }


       setTimeout(function(){ resetBot().then(x => {bot.login(process.env.TOKEN)})}, 43200000)

  
  
};



