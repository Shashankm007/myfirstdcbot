const fs = require('fs');
const {
    Client,
    Collection,
    MessageEmbed
} = require('discord.js');


const {
    prefix,
    token
} = require('./config.json');
const client = new Client({
    disableEveryone: true
});


client.once('ready', () => {
    console.log(`${client.user.username} is now up and running...`);
    client.user.setActivity(`${client.guilds.cache.size} servers | ${prefix}help`, {
        type: 'WATCHING'
    });
});


client.login(token);

client.commands = new Collection();
client.aliases = new Collection();


client.categories = fs.readdirSync('./commands/');
['command'].forEach(handler => {
    require(`./handler/${handler}`)(client);
});


// join logs
client.on('guildCreate', guild => {
    client.user.setActivity(`${client.guilds.cache.size} servers | ${prefix}help`, {
        type: 'WATCHING'
    });
    const joinEmbed = new MessageEmbed()
        .setColor('#7CFC00')
        .addFields({
            name: 'Server Joined',
            value: '```' + `${guild.name}` + '```',
            inline: true
        }, {
            name: 'Server ID',
            value: '```' + `${guild.id}` + '```',
            inline: true
        }, {
            name: 'Server Members',
            value: '```' + `${guild.memberCount}` + '```',
            inline: true
        })
        .setTimestamp();
    client.channels.cache.get('756883371963187240').send(joinEmbed);
});


// leave logs
client.on('guildDelete', guild => {
    client.user.setActivity(`${client.guilds.cache.size} servers | ${prefix}help`, {
        type: 'WATCHING'
    });
    const removeEmbed = new MessageEmbed()
        .setColor('#FFA07A')
        .addFields({
            name: 'Server Removed',
            value: '```' + `${guild.name}` + '```',
            inline: true
        }, {
            name: 'Server ID',
            value: '```' + `${guild.id}` + '```',
            inline: true
        }, {
            name: 'Server Members',
            value: '```' + `${guild.memberCount}` + '```',
            inline: true
        })
        .setTimestamp();
    client.channels.cache.get('756883371963187240').send(removeEmbed);
});


client.on('message', async message => {

    if (message.author.bot) {
        return;
    }
    if (message.channel.type === 'dm') {
        return;
    }
    if (!message.guild) {
        return;
    }
    if (!message.content.startsWith(prefix)) {
        return;
    }
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    try {
        if (command.name == 'info' || command.name == 'help' || command.name == 'invite') {
            command.execute(client, message, args);
        }
        else{
            command.execute(message, args);
        }
    } catch (error) {
        console.error(error);
        message.reply('There was an error running that command.');
    }
});