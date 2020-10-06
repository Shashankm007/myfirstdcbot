const nekoClient = require('nekos.life');
const neko = new nekoClient();

const func = require('../../function.js');
const { bot_name, bot_img, bot_color } = require('../../config.json');

module.exports = {
    name: 'fact',
    aliases: ['facts'],
    description: 'Returns a random fact.',
    category: 'fun',
    usage: '[command]',
    cooldown: 5,
    async execute(message) {

        const fact = await neko.sfw.fact();
        const embed = {
            color: bot_color,
            description: fact.fact,
            timestamp: new Date(),
            footer: {
                text: bot_name,
                icon_url: bot_img,
            },
        };
        func.cusEmbed(embed, message);


    },
};