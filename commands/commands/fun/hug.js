const nekoClient = require('nekos.life');
const neko = new nekoClient();

const func = require('../../function.js');
const { bot_name, bot_img, bot_color } = require('../../config.json');

module.exports = {
    name: 'hug',
    aliases: [],
    description: 'Hugs!',
    category: 'fun',
    usage: '[command | mention]',
    cooldown: 5,
    async execute(message) {

        const member = message.mentions.users.first();
        if (!member) return message.reply('You can not hug yourself!');

        const hug = await neko.sfw.hug();
        const embed = {
            color: bot_color,
            title: `${message.author.username} gives ${member.username} a hug!`,
            image: {
                url: hug.url,
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