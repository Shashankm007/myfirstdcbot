const nekoClient = require('nekos.life');
const neko = new nekoClient();

const func = require('../../function.js');
const { bot_name, bot_img, bot_color } = require('../../config.json');

module.exports = {
    name: 'kiss',
    aliases: [],
    description: 'Kisses!',
    category: 'fun',
    usage: '[command | mention]',
    cooldown: 5,
    async execute(message) {

        const member = message.mentions.users.first();
        if (!member) return message.reply('You can not kiss yourself!');

        const kiss = await neko.sfw.kiss();
        const embed = {
            color: bot_color,
            title: `${message.author.username} kissed ${member.username}!`,
            image: {
                url: kiss.url,
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