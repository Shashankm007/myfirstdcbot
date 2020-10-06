const nekoClient = require('nekos.life');
const neko = new nekoClient();

const func = require('../../function.js');
const { bot_name, bot_img, bot_color } = require('../../config.json');

module.exports = {
    name: 'cat',
    aliases: ['meow'],
    description: 'Returns a random image of a cat.',
    category: 'image',
    usage: '[command]',
    cooldown: 5,
    async execute(message) {

        const cat = await neko.sfw.meow();
        const embed = {
            color: bot_color,
            title: 'Meowww',
            image: {
                url: cat.url,
            },
            timestamp: new Date(),
            footer: {
                text: bot_name,
                icon_url: bot_img,
            },
        };
        func.cusEmbed(embed, message);

    },
};
