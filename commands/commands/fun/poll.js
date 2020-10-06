const { bot_name, bot_img, bot_color } = require('../../config.json');
const func = require('../../function.js');

module.exports = {
    name: 'poll',
    aliases: [],
    description: 'Creates a poll.',
    category: 'fun',
    usage: '[command | question]',
    cooldown: 60,
    async execute(message, args) {

        if (!args.length) {
            return func.errEmbed('Can not make an empty poll.', message);
        } else {
            const poll = args.join(' ');
            const pollEmbed = {
                color: bot_color,

                author: {
                    name: `Poll by ${message.author.tag}`,
                    icon_url: message.author.displayAvatarURL({ dynamic: true }),
                },
                description: '**Poll:** `' + poll + '`',
                timestamp: new Date(),
                footer: {
                    text: bot_name,
                    icon_url: bot_img,
                },
            };

            func.cusEmbed(pollEmbed, message).then(async embedMessage => {
                await embedMessage.react('👍');
                await embedMessage.react('👎');
            });
        }


    },
};