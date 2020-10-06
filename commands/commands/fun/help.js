const { default_prefix, bot_name, bot_img, bot_color, bot_inv, bot_discord } = require('../../config.json');
const func = require('../../function.js');
const db = require('quick.db');
const { readdirSync } = require('fs');



module.exports = {
    name: 'help',
    aliases: ['h'],
    description: 'Helps you navigate through our bot.',
    category: 'utility',
    usage: '[command]',
    cooldown: 5,
    async execute(message, args) {

        let prefix = await db.get(`prefix_${message.guild.id}`);
        if (prefix === null) prefix = default_prefix;

        if (!args.length) {

            const embed = {
                color: bot_color,
                title: `> ${func.capitalize(bot_name)} Commands`,
                description: `[Discord](${bot_discord}) | [Invite](${bot_inv})`,
                fields: [{
                        name: 'Steam',
                        value: '`' + `${prefix}h steam` + '`',
                        inline: true,
                    },
                    {
                        name: 'Fun',
                        value: '`' + `${prefix}h fun` + '`',
                        inline: true,
                    },
                    {
                        name: 'Image',
                        value: '`' + `${prefix}h image` + '`',
                        inline: true,
                    },
                    {
                        name: 'Game Stats',
                        value: '`' + `${prefix}h games` + '`',
                        inline: true,
                    },
                    {
                        name: 'NSFW',
                        value: '`' + `${prefix}h nsfw` + '`',
                        inline: true,
                    },
                    {
                        name: 'Moderation',
                        value: '`' + `${prefix}h moderation` + '`',
                        inline: true,
                    },
                    {
                        name: 'Utility',
                        value: '`' + `${prefix}h utility` + '`',
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

        } else {

            const name = args[0].toLowerCase();
            const category = [];
            readdirSync('./commands/').forEach(categoryName => {
                category.push(categoryName);
            });

            if (category.includes(name)) {

                const fileArr = [];
                readdirSync(`./commands/${name}/`).forEach(command => {
                    const commandName = command.replace('.js', '');
                    fileArr.push('`' + commandName + '`');
                });
                const embed = {
                    color: bot_color,
                    title: `> ${func.capitalize(name)} Commands`,
                    description: fileArr.join(', ') + `\n\n Use ${prefix} before each command!`,
                    timestamp: new Date(),
                    footer: {
                        text: bot_name,
                        icon_url: bot_img,
                    },
                };
                func.cusEmbed(embed, message);

            } else {

                const { commands } = message.client;
                const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
                if (!command) {
                    return func.errEmbed('Command not found.', message);
                }

                const embed = {
                    color: bot_color,
                    title: `> ${prefix}${command.name}`,
                    fields: [{
                            name: 'Name',
                            value: '`' + `${command.name}` + '`',
                            inline: true,
                        },
                        {
                            name: 'Category',
                            value: '`' + `${command.category}` + '`',
                            inline: true,
                        },
                        {
                            name: 'Usage',
                            value: '`' + `${command.usage || 'None' }` + '`',
                            inline: true,
                        },
                        {
                            name: 'Aliases',
                            value: '`' + `${command.aliases.join('/') || 'None'}` + '`',
                            inline: true,
                        },
                        {
                            name: 'Cooldown',
                            value: '`' + `${command.cooldown || 'None' }second(s)` + '`',
                            inline: true,
                        },
                        {
                            name: '\u200b',
                            value: '\u200b',
                            inline: true,
                        },
                        {
                            name: 'Description',
                            value: '`' + `${command.description || 'None'}` + '`',
                            inline: false,
                        },
                    ],

                    timestamp: new Date(),
                    footer: {
                        text: bot_name,
                        icon_url: bot_img,
                    },
                };

                func.cusEmbed(embed, message);
            }
        }

    },
};
