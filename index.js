const Discord = require('discord.js'),
    TokenManager = require('./src/token-manager')

let athena = new Discord.Client(),
    tm = new TokenManager('tokens')

athena.on('ready', () => {
    console.log('Recalling Overwatch members...')
})

tm.parseTokens().then(() => {
    athena.login(tm.tokens.discord)
})

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});
