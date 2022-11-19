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

const channelArray = [
    '1043198232479662090',
    '1043198264817762506',
    '1043229501695467650',
    '886161997983531018'];

client.on('messageCreate', message => {
    if (message.channel.id == '976092971504140371') {
        for (let index = 0; index < channelArray.length; index++) {
            client.channels.cache.get(channelArray[index]).send(message);
        }
    }
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.login(process.env.TOKEN)