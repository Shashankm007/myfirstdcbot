const fetch = require('node-fetch');

const func = require('../../function.js');
const { bot_name, bot_img, bot_color } = require('../../config.json');


module.exports = {
    name: 'boobs',
    aliases: ['boob', 'tits'],
    description: 'Returns a/an image/gif of boobs.',
    category: 'nsfw',
    usage: '[command]',
    cooldown: 5,
    async execute(message) {

        // nsfw check
        if (!message.channel.nsfw) {
            return func.errEmbed('Not a NSFW channel.', message);
        }
        // nsfw check

        const randArr = ['Titties', 'Boobies', 'boobs'];
        const subReddit = func.randomize(randArr);

        // command code
        fetch(`https://www.reddit.com/r/${subReddit}/random.json?limit=1`)
            .then(res => res.json())
            .then(json => {
                const url = json[0].data.children[0].data.url;

                const embed = {
                    color: bot_color,
                    title: `From r/${subReddit}`,
                    image: {
                        url: url,
                    },
                    timestamp: new Date(),
                    footer: {
                        text: bot_name,
                        icon_url: bot_img,
                    },
                };
                func.cusEmbed(embed, message);
            });
    },
};
