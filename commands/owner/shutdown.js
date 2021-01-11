module.exports = {
    config: {
        name: "shutdown",
        description: "shuts down the bot!",
        usage: "!shutdown",
        accessableby: "Bot Owner",
        aliases: ["botstop"]
    },
    run: async (bot, message, args) => {
    if(message.author.id != "255327008576241674, 738000272730619933") return message.channel.send("You're the bot the owner!")

    try {
        await message.channel.send("Bot is shutting down...")
        process.exit()
    } catch(e) {
        message.channel.send(`ERROR: ${e.message}`)
    }
    


    }
}