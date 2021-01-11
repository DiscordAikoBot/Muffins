const { ownerid, prefix } = require("../../botconfig.json");
const { inspect } = require("util")
const doc = require('authy-verify');
const db = require("quick.db");

module.exports = { 
    config: {
        name: "eval",
        description: "Evaluates code",
        accessableby: "Bot Owner",
        type: "owner",
        usage: `${prefix}eval <input>`
    },
    run: async (bot, message, args) => {
     const creatorIDs = ["255327008576241674", "455046083953950731", "738000272730619933"];
       
            if (!creatorIDs.includes(message.author.id)) {
              return message.channel.send('You are not the owner of the bot').then(m => m.delete(5000));
            }
        try {
            let toEval = args.join(" ")
			let evaluated = inspect(eval(toEval, { depth: 0 }));
            
            if (!toEval) {
                return message.channel.send(`Error while evaluating: \`air\``);
            } else {
                let hrStart = process.hrtime()
                let hrDiff;
                hrDiff = process.hrtime(hrStart);
                return message.channel.send(`*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.*\n\`\`\`javascript\n${evaluated}\n\`\`\``, { maxLength: 1900 })
            }
            
        } catch (e) {
            return message.channel.send(`Error while evaluating: \`${e.message}\``);
        }

      
    }
}
