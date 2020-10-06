const nekoClient = require('nekos.life');
const neko = new nekoClient();

const func = require('../../function.js');
const { bot_name, bot_img, bot_color } = require('../../config.json');

module.exports = {
    name: 'owoify',
    aliases: ['owo'],
    description: 'OwOifies your text.',
    category: 'fun',
    usage: '[command | text]',
    cooldown: 5,
    async execute(message, args) {

        const text = args.join(' ');
        if (!args[0]) {
            return func.errEmbed('Please enter text to OwOify!', message);
        } else if (text.length > 200) {
            return func.errEmbed('Can not OwOify over 200 characters.', message);
        } else {

            const owoify = await neko.sfw.OwOify({ text: text });
            const embed = {
                color: bot_color,
                description: owoify.owo,
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