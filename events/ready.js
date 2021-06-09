const config = require('../config.js');

module.exports = client => {

client.user.setPresence({ activity: { name:config.bot.ready }, status:'dnd', type:'playing' })

};
