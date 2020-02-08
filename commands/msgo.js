module.exports = {
    name: 'msgo',
    description: 'Send URL of Gundam to .',
    execute(msg, args) {
        let name = args.join('');
        name = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

        let trueName = global.trueNames[name];
        let url = global.msgoDict[name];

        if (!url) {
            msg.reply("can't find that Gundam, boss.");
        } else {
            msg.reply(`here's your ${trueName}, boss: ${url}`);
        }
    }
}