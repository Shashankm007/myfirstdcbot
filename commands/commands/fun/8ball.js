const nekoClient = require('nekos.life');
const neko = new nekoClient();

const func = require('../../function.js');
const { bot_name, bot_img, bot_color } = require('../../config.json');

module.exports = {
    name: '8ball',
    aliases: ['ask'],
    description: 'Returns an answer for your question.',
    category: 'fun',
    usage: '[command | question]',
    cooldown: 5,
    async execute(message, args) {

        if (!args[0]) {
            return func.errEmbed('You need to ask a question.', message);
        } else {
            const question = args.join(' ');
            const ask = await neko.sfw['8Ball']({ text: question });
            const embed = {
                color: bot_color,
                title: ask.response,
                description: '**Question:** `' + question + '`',
                image: {
                    url: ask.url,
                },
                timestamp: new Date(),
                footer: {
                    text: bot_name,
                    icon_url: bot_img,
                },
            };
            func.cusEmbed(embed, message);
        }

    },
};