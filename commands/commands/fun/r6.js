const { rainbowkey, bot_name, bot_img, bot_color } = require('../../config.json');
const func = require('../../function.js');

const R6StatsAPI = require('r6statsapi').default;
const API = new R6StatsAPI(rainbowkey);

module.exports = {
    name: 'r6',
    aliases: ['rainbow'],
    description: 'Gives a brief info of your r6 stats.',
    category: 'games',
    usage: '[command | username]',
    cooldown: 5,
    async execute(message, args) {

        if (!args[0]) {
            return func.errEmbed('Please provide a username', message);
        } else {

            const embed = { title: 'Getting player data...' };
            const m = await func.cusEmbed(embed, message);

            const username = args[0];
            const platform = 'pc';

            API.getGenericStats(username, platform, 'all').then(userStats => {
                const PlayerStatsR6 = {
                    color: bot_color,
                    title: userStats.username,
                    author: {
                        name: `R6 stats of ${userStats.username}`,
                        icon_url: userStats.avatar_url_146,
                    },
                    thumbnail: {
                        url: `${userStats.avatar_url_256}`,
                    },
                    fields: [{
                            name: 'Kills',
                            value: '`' + userStats.stats.general.kills + '`',
                            inline: true,
                        },
                        {
                            name: 'Deaths',
                            value: '`' + userStats.stats.general.deaths + '`',
                            inline: true,
                        },
                        {
                            name: 'Assists',
                            value: '`' + userStats.stats.general.assists + '`',
                            inline: true,
                        },
                        {
                            name: 'K/D',
                            value: '`' + userStats.stats.general.kd + '`',
                            inline: false,
                        },
                        {
                            name: 'Penetration Kills',
                            value: '`' + userStats.stats.general.penetration_kills + '`',
                            inline: true,
                        },
                        {
                            name: 'Melee Kills',
                            value: '`' + userStats.stats.general.melee_kills + '`',
                            inline: true,
                        },
                        {
                            name: 'Headshots',
                            value: '`' + userStats.stats.general.headshots + '`',
                            inline: true,
                        },
                        {
                            name: 'Wins',
                            value: '`' + userStats.stats.general.wins + '`',
                            inline: true,
                        },
                        {
                            name: 'Losses',
                            value: '`' + userStats.stats.general.losses + '`',
                            inline: true,
                        },
                        {
                            name: 'Draws',
                            value: '`' + userStats.stats.general.draws + '`',
                            inline: true,
                        },
                    ],
                    timestamp: new Date(),
                    footer: {
                        text: bot_name,
                        icon_url: bot_img,
                    },
                };
                m.edit({ embed: PlayerStatsR6 });
            }).catch(() => {
                func.errEmbedEdit('Invalid username/platform.', m);
            });

        }


    },
};
