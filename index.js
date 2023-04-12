// import bot token from .env file
const TOKEN = require('dotenv').config();

// import discord.js module
const { Client, GatewayIntentBits, TextChannel, Message } = require('discord.js');

// import openai module, key, new config
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// configure Discord bot permissions(intents)
const client = new Client({
    intents:
        [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildEmojisAndStickers,
            GatewayIntentBits.GuildWebhooks,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.GuildMessageTyping,
            GatewayIntentBits.GuildScheduledEvents,
        ],
});

// console log bot startup
client.on('ready', () => {
    console.log(`I'M ALIVE!! LOGGED IN AS ${client.user.tag}`)
});

// function returns a response in form of question about user input subject ranked in difficulty from 1-10
client.on('messageCreate', async function (message) {
    try {
        // ignore input from the bot itself
        if (message.author.bot) return;
        // ignore input that contains a * (used to trigger the next function)
        else if (message.content.toLowerCase().includes('*')) return;
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { "role": "system", "content": "" },
                { "role": "user", "content": "" },
                { "role": "assistant", "content": "" },
                { "role": "user", "content": `${message.content}` }
            ]
        });
        message.reply(`${completion.data.choices[0].message.content}`)
        return responseOne = completion.data.choices[0].message.content;
    } catch (error) {
        message.reply(`${error}`)
    }
});

// function returns the answer to the question from the previous response
client.on('messageCreate', async function (message) {
    try {
        // ignore input from the bot itself
        if (message.author.bot) return;
        // ignore input that doesn't contain a *
        else if (message.content.toLowerCase().includes('*')) {
            const completion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    { "role": "system", "content": "Describe the desired AI characteristics and how questions should be answered" },
                    { "role": "user", "content": "A sample question will go here" },
                    { "role": "assistant", "content": "An answer to the previous question will go here" },
                    { "role": "user", "content": `${responseOne}` }
                ]
            });
            message.reply(`${completion.data.choices[0].message.content}`)
            responseTwo = completion.data.choices[0].message.content;
        }
    } catch (error) {
        message.reply(`${error}`)
    }
});

// use token from env file to log in
client.login(process.env.TOKEN);

