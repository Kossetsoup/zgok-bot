const Discord = require('discord.js');
const bot = new Discord.Client();
const botCommands = require('./commands')
bot.commands = new Discord.Collection();

require('dotenv').config();

const bot_token = process.env.BOT_TOKEN;
const prefix = process.env.PREFIX;

Object.keys(botCommands).map(key => {
    bot.commands.set(botCommands[key].name, botCommands[key]);
});

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
    if (msg.author.bot) {
        return;
    }

    if (msg.content.startsWith(prefix)) {
        const args = msg.content.split(/ +/);
        const command = args.shift().toLowerCase().slice(1);
        console.info(`Called command: ${command}`);
    
        if (!bot.commands.has(command)) {
            console.info('Command does not exist!');
            return;
        }
    
        try {
            bot.commands.get(command).execute(msg, args);
        } catch (err) {
            console.error(err);
            msg.reply('error executing command!');
        }
    }
});

bot.login(bot_token);