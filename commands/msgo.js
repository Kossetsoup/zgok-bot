module.exports = {
    name: 'msgo',
    description: 'Send URL of Gundam to chat.',
    execute(msg, args) {
        let name = args.join('');
        name = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

        let matches = [];

        for (let gundam of global.msgoList) {
            if (gundam.key.includes(name)) {
                matches.push(gundam);
            }
        }

        if (matches.length === 1) {
            let foundKey = matches[0].key;
            let url = matches[0].url;
            let trueName = global.trueNames[foundKey];

            msg.reply(`here's your ${trueName}, boss: ${url}`);
        } else if (matches.length >= 10) {
            msg.reply("you'll have to be more specific than that, boss.")
        } else if (matches.length > 1) {
            let msgStr = "did you mean one of these, boss?";

            for (let match of matches) {
                msgStr += (`\n${global.trueNames[match.key]} - ${match.url}`);
            }

            msg.reply(msgStr);
        } else {
            msg.reply("can't find that Gundam, boss.");
        }
    }
}