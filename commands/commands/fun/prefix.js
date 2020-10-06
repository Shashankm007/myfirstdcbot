const db = require('quick.db');
const func = require('../../function.js');

module.exports = {
    name: 'prefix',
    aliases: [],
    description: 'Sets prefix.',
    category: 'utility',
    usage: '[command | prefix]',
    cooldown: 5,
    async execute(message, args) {

        if (!message.member.hasPermission('MANAGE_GUILD')) return func.errEmbed('You do not have permission to do that.', message);
        if (!args[0]) return func.errEmbed('Please provide a new prefix', message);
        if (args[1]) return func.errEmbed('The prefix can not be two spaces', message);
        db.set(`prefix_${message.guild.id}`, args[0]);
        message.channel.send(`Changed prefix to \`${args[0]}\``);

    },
};
