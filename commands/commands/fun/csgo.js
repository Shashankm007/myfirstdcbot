const { steamkey, bot_name, bot_img, bot_color } = require('../../config.json');
const func = require('../../function.js');

const SteamAPI = require('steamapi');
const steam = new SteamAPI(steamkey);

module.exports = {
    name: 'csgo',
    aliases: ['cs'],
    description: 'Gives a brief info of your csgo stats.',
    category: 'games',
    usage: '[command | steam ID]',
    cooldown: 5,
    async execute(message, args) {

        if (!args.length) {
            return func.errEmbed('Please provide a steam link.', message);
        } else {

            const embed = { title: 'Getting player data...' };
            const m = await func.cusEmbed(embed, message);

            steam.resolve(args[0]).then(id => {
                steam.getUserSummary(id).then(PlayerSummary => {
                    steam.getUserStats(id, '730').then(PlayerStats => {

                        const PlayerKD = (PlayerStats.stats.total_kills / PlayerStats.stats.total_deaths).toFixed(2);
                        const PlayerAccuracy = (PlayerStats.stats.total_shots_hit / PlayerStats.stats.total_shots_fired).toFixed(2);

                        const PlayerStatsCS = {
                            color: bot_color,
                            title: PlayerSummary.steamID,
                            author: {
                                name: `CS:GO stats of ${PlayerSummary.nickname}`,
                                icon_url: PlayerSummary.avatar.small,
                                url: `https://steamcommunity.com/profiles/${PlayerSummary.steamID}`,
                            },
                            thumbnail: {
                                url: `${PlayerSummary.avatar.large}`,
                            },
                            fields: [{
                                    name: 'Total Kills',
                                    value: '`' + PlayerStats.stats.total_kills + '`',
                                    inline: true,
                                },
                                {
                                    name: 'Total Deaths',
                                    value: '`' + PlayerStats.stats.total_deaths + '`',
                                    inline: true,
                                },
                                {
                                    name: 'K/D',
                                    value: '`' + PlayerKD + '`',
                                    inline: true,
                                },
                                {
                                    name: 'Shots hit',
                                    value: '`' + PlayerStats.stats.total_shots_hit + '`',
                                    inline: true,
                                },
                                {
                                    name: 'Shots fired',
                                    value: '`' + PlayerStats.stats.total_shots_fired + '`',
                                    inline: true,
                                },
                                {
                                    name: 'Accuracy',
                                    value: '`' + PlayerAccuracy + '`',
                                    inline: true,
                                },
                                {
                                    name: 'C4 Planted',
                                    value: '`' + PlayerStats.stats.total_planted_bombs + '`',
                                    inline: true,
                                },
                                {
                                    name: 'C4 Defused',
                                    value: '`' + PlayerStats.stats.total_defused_bombs + '`',
                                    inline: true,
                                },
                            ],
                            timestamp: new Date(),
                            footer: {
                                text: bot_name,
                                icon_url: bot_img,
                            },
                        };
                        m.edit({ embed: PlayerStatsCS });
                    }).catch(() => {
                        func.errEmbedEdit('Please make your `Game details` public.\n Steam may take some time sync settings.', m);
                    });
                }).catch(() => {
                    func.errEmbedEdit('Unknown', m);
                });
            }).catch(() => {
                func.errEmbedEdit('Unable to resolve steam URL.', m);
            });

        }


    },
};
