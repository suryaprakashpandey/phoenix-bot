const { Client, GatewayIntentBits } = require('discord.js');
require("dotenv").config();
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

const channelArray = [];
const pingArray = [];

client.on('messageCreate', message => {
    if (message.author.id == '816978952899133451') {
        if (message.toString() == '$add') {
            channelArray.push(message.channel.id.toString());
            console.log('Channel array = ', channelArray)
            message.channel.send("edit '$add' message to role ID to ping. Eg. 2339856629587223\nNote: If everyone role is intended, write 'everyone'.");
        }

        else if (message.toString() == '$remove') {
            channelArray.splice(channelArray.indexOf(message.channel.id.toString()));
            pingArray.splice(channelArray.indexOf(message.channel.id.toString()));
            console.log('Channel array = ', channelArray);
            console.log('Ping array = ', pingArray);
            message.channel.send("Removed this channel successfully.");
        }

        else if (message.channel.id == '976092971504140371') {
            for (let index = 0; index < pingArray.length; index++) {
                let msg = message.toString();
                if (pingArray[index] != 'everyone') {
                    while (msg.includes('@everyone')) {
                        let ping = '<@&' + pingArray[index] + '>';
                        msg = msg.replace('@everyone', ping)
                    }
                }
                client.channels.cache.get(channelArray[index]).send(msg);
            }
        }
    }
});

client.on('messageUpdate', (oldMessage, newMessage) => {
    if (oldMessage.content == '$add' && oldMessage.author.id == '816978952899133451') {
        pingArray.push(newMessage.toString());
        client.channels.cache.get(oldMessage.channel.id).send("Added successfully!");
        console.log('Ping array = ', pingArray);
    }
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.TOKEN)