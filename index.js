const Discord      = require('discord.js'),
      TokenManager = require('./src/token-manager'),
      Request      = require('request')

let athena = new Discord.Client(),
    tm = new TokenManager('tokens')

athena.on('ready', () => {
    console.log('Recalling Overwatch members...')
}).on('message', (message) => {
    if(message.content.indexOf('/ow') === 0) {
        let tags = message.content.split(' ').slice(1)
        message.channel.sendMessage('Your id is: ' + message.channel.id)
        Request.post({
            url: 'http://localhost:3000/post',
            json: true,
            body: { tags: tags, id: parseInt(message.channel.id) }
        }, (error, response, body) => {
            if(error) message.channel.sendMessage(error)
            else {
                message.channel.sendMessage(body)
                    .catch(console.log);
            }
        })
    }
})

tm.parseTokens().then(() => {
    athena.login(tm.tokens.discord)
})

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});
