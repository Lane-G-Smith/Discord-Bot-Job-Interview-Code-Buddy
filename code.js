// import bot token from .env file
const TOKEN = require("dotenv").config();

// import discord.js module
const {Client,GatewayIntentBits} = require("discord.js");

// import openai module, key, new config
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({apiKey: process.env.OPENAI_API_KEY,});
const openai = new OpenAIApi(configuration);

// configure Discord bot permissions(intents)
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
  ],
});

// console log when the bot is logged in
client.on("ready", () => {
  console.log(`I'M ALIVE!! LOGGED IN AS ${client.user.tag}`);
});

// function returns a response in the form of a question about the user input subject ranked in difficulty from 1-10
client.on("messageCreate", async function (message) {
  try {

// ignore input from the bot itself
      if (message.author.bot) return;

// ignore input that contains "answer" (used to trigger the next answer function)
      else if (message.content.toLowerCase().startsWith("answer")) return;

// message must start with !!! to trigger a question
      else if (message.content.toLowerCase().startsWith("code-buddy")) {

// AI personality and response to user input 
      const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "system",
        content: "You are interviewing an applicant for a junior javascript web developer position. The ideal applicant is proficient in HTML, CSS, Javascript, React, Nodejs, Mongodb, Expressjs, etc. You ask questions, provide short coding challenges &  other common tasks from web developer interviews. The subject of your question will be in the prompt, if no subject is specified then the subject is random. Give each question a difficulty rating between 1 and 10 written like 1/10, 2/10, etc. Provide questions/challenges/tasks of a specific difficulty when prompted, difficulty is random if not specified. Ignore any mention of code-buddy in messages."},{
        role: "user",
        content:"code-buddy javascript 2" },{
        role: "assistant",
        content: "In the following array which item is at position zero? fruits[apple, banana, orange, pear] 2/10"},{
        role: "user",
        content: "code-buddy HTML"},{
        role: "assistant",
        content: "What does HTML stand for? 1/10"},{
        role:"user",
        content:`${message.content}`},],
      });

// respond with the answer (initial challenge question)
        // store response in data variable
        data = (`${completion.data.choices[0].message.content}`);

// less than 2000 character response
          if (data.length < 2000) {
          message.reply(`${data}`)
          }

// more than 2000 character response
          else if (data.length > 2000){
          partOne = data.substring(0,2000);
          partTwo = data.substring(2000,4000);
          partThree = data.substring(4000,6000);
          message.reply(`${partOne}`);
          message.reply(`${partTwo}`);
          message.reply(`${partThree}`);
          }

// save the question to use as the prompt for the answer function
      return (responseOne = completion.data.choices[0].message.content);

// send error messages
  }} catch (error) {
    message.reply(`${error}`);
  }
});

// function returns the answer to the previous question
client.on("messageCreate", async function (message) {
  try {

// ignore input from the bot itself
    if (message.author.bot) return;

// ignore input that doesn't contain a ***
    else if (message.content.toLowerCase().startsWith("answer")) {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
          role:"system",
          content:"You are a senior javascript web developer teaching a 10-year-old how to do web development. Answer questions in concise and simple terms. Be thorough and provide documentation from MDN or other online resources when necessary.",},{
          role:"user",
          content:"in the following array which item is at position zero? fruits[apple, banana, orange, pear]",},{
          role:"assistant",
          content:"the item at position zero is apple. In an array, the first item is always at position zero and counts upwards from there.",},{
          role:"user",
          content:`${responseOne}`},
        ],
      });

// store response in data variable
          data = (`${completion.data.choices[0].message.content}`);

// respond with the answer (initial challenge question)
// less than 2000 character response
          if (data.length < 2000) {
          message.reply(`${data}`)
          }

// more than 2000 character response
          else if (data.length > 2000){
          partOne = data.substring(0,2000);
          partTwo = data.substring(2000,4000);
          partThree = data.substring(4000,6000);
          message.reply(`${partOne}`);
          message.reply(`${partTwo}`);
          message.reply(`${partThree}`);
          }
    }

// send error messages
  } catch (error) {
    message.reply(`${error}`);
  }
});

// use token from env file to log in
client.login(process.env.TOKEN);

