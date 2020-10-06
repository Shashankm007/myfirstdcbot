const nekoClient = require('nekos.life');
const neko = new nekoClient();

const func = require('../../function.js');
const { bot_name, bot_img, bot_color } = require('../../config.json');

module.exports = {
    name: 'dog',
    aliases: ['woof'],
    description: 'Returns a random image of a dog.',
    category: 'image',
    usage: '[command]',
    cooldown: 5,
    async execute(message) {

        const dog = await neko.sfw.woof();
        const embed = {
            color: bot_color,
            title: 'Woof Woof!',
            image: {
                url: dog.url,
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
