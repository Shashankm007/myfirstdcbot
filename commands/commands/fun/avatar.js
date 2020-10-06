const { bot_name, bot_img, bot_color } = require('../../config.json');
const func = require('../../function.js');

module.exports = {
    name: 'avatar',
    aliases: ['av', 'pfp'],
    description: 'Returns avatar of the user.',
    category: 'utility',
    usage: '[command | mention]',
    cooldown: 5,
    async execute(message, args) {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;
        const embed = {
            color: bot_color,
            author: {
                name: member.user.tag,
                icon_url: member.user.displayAvatarURL({ dynamic: true }),
            },
            image: {
                url: member.user.displayAvatarURL({ dynamic: true, size: 1024 }),
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
