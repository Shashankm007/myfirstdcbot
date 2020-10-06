const { bot_name, bot_img, bot_color, bot_web, bot_inv, bot_discord } = require('../../config.json');
const func = require('../../function.js');


module.exports = {
    name: 'info',
    aliases: ['botinfo', 'bot'],
    description: 'Returns info about the bot.',
    category: 'utility',
    usage: '[command]',
    cooldown: 5,
    require: 'client',
    async execute(client, message) {

        const embed = {
            color: bot_color,
            author: {
                name: func.capitalize(bot_name),
                icon_url: bot_img,
                url: bot_web,
            },

            fields: [{
                    name: 'Servers',
                    value: `\`${client.guilds.cache.size}\``,
                    inline: true,
                },
                {
                    name: 'Users',
                    value: `\`${client.users.cache.size}\``,
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: true,
                },


                {
                    name: 'Website',
                    value: `[blazy.xyz](${bot_web})`,
                    inline: true,
                },
                {
                    name: 'Invite',
                    value: `[blazy.xyz/invite](${bot_inv})`,
                    inline: true,
                },
                {
                    name: 'Discord',
                    value: `[blazy.xyz/discord](${bot_discord})`,
                    inline: true,
                },

                {
                    name: 'Creators',
                    value: '[@znixhook](https://twitter.com/znixhook)',
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: '[@_hashTAG007](https://twitter.com/_hashTAG007)',
                    inline: true,
                },
            ],
            timestamp: new Date(),
            footer: {
                text: bot_name,
                icon_url: bot_img,
            },
        };
        func.cusEmbed(embed, message);

    },
};
