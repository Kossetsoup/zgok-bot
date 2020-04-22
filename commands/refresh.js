const populateMsgoList = require('../populateMsgoList');

module.exports = {
    name: 'refresh',
    description: 'Ping!',
    execute(msg, args) {
        msg.reply("refreshing my cache, boss.");
        global.msgoList = [];
        global.trueNames = {};
        populateMsgoList();
    }
}