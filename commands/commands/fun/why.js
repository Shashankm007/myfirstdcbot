const nekoClient = require('nekos.life');
const neko = new nekoClient();

const func = require('../../function.js');
const { bot_name, bot_img, bot_color } = require('../../config.json');

module.exports = {
    name: 'why',
    aliases: [],
    description: 'Asks you a stupid question.',
    category: 'fun',
    usage: '[command]',
    cooldown: 5,
    async execute(message) {


        const why = await neko.sfw.why();
        const embed = {
            color: bot_color,
            description: why.why,
            timestamp: new Date(),
            footer: {
                text: bot_name,
                icon_url: bot_img,
            },
        };
        func.cusEmbed(embed, message);

    },
};