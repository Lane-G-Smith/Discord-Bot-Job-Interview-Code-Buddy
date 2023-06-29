<h1 align="center">Dev-Job-Interview-Discord-Bot-GPT3.5-Turbo</h1>
<table align="center">
  <tr>
    <td align="center" height="108" width="108">
        <img     src="https://camo.githubusercontent.com/2993f7180d5cc3231060f66cfa1f0f65a1d09c0efd68d08d0190902ba9200d81/68747470733a2f2f7777772e7376677265706f2e636f6d2f73686f772f3335333635352f646973636f72642d69636f6e2e737667"
        width="48"
        height="48"
        />
        <br /><strong>Discord.js</strong>
    </td>
    <td align="center" height="108">
      <p align="left">This Discord bot is designed to help junior web developers prepare for job interviews. This bot offers practice questions and coding challenges that are commonly found in real-world interviews. You can request questions or tasks with prompts such as "React" or "Javascript." Optionally, you can also specify the difficulty level between 1 and 10 with a number (example: javascript 7). To get the answer to the previous question along with an explanation and links to documentation, simply type "***". This bot functions by using the GPT-3.5-Turbo API.
      </p>
     </td>
   </tr>
 </table>

# Installation and deployment Instructions

# !!This bot does NOT respond to DMs, it must be in a server with you!!

### Get the bot 'shell' from Discord. It's free, and it takes 5 minutes
```sh
https://discord.com/developers/applications
```
### Go to OpenAI and open an account
```sh
https://platform.openai.com/signup
```
### Install node.js
```sh
https://nodejs.org/en/
```
### Install git
```sh
https://git-scm.com/downloads
```
### Create a new folder and open it in the terminal to set up git
```sh
git init
```
### Navigate to the new git folder in the terminal and clone this repository
```sh
git clone https://github.com/Lane-G-Smith/Dev-Job-Interview-Discord-Bot-GPT3.5-Turbo.git
```
### Navigate to the Dev-Job-Interview-Discord-Bot-GPT3.5-Turbo folder and install dependencies
```sh
npm install
```
### Rename example_.env to .env
### Place your secret Discord bot token from the first step into the .env file
```sh
TOKEN=your_unique_token_here
```
### Place your secret OpenAI API key from the second step into the .env file
```sh
OPENAI_API_KEY=your_unique_API_key_here
```
### To host the bot locally, open the project in the terminal and run node
```sh
node code.js
```
### To host the bot locally and keep it running in the background indefinitely, install PM2
```sh
npm install pm2 -g
```
### Run your bot locally using pm2 https://pm2.keymetrics.io/
```sh
pm2 start code.js
```
### Congratulations, your bot should now be live & confirmation should be logged in the terminal. Use your personal link from the Discord developer portal to invite your bot to a Discord server
```sh
https://discord.com/developers/applications
```
