var readline = require('readline'),
    fs = require('fs')

class TokenManager {

    constructor(filePath = '../tokens') {
        this.filePath = filePath
        this.tokens = {}
    }

    parseTokens () {
        return new Promise((resolve, reject) => {
            let rl = readline.createInterface({
                input: fs.createReadStream(this.filePath),
                terminal: false
            })
                .on('line', function(line) {
                    let words = line.split(' ')
                    if(words.length !== 2)
                        throw new Error('Improper formatting. (Name-token pairs are space-delimited, and separate from the next pair by newline.)')
                    this.tokens[words[0]] = words[1]
                }.bind(this))
                .on('error', function (err) {
                    reject(err)
                }.bind(this))
        })
    }
}


module.exports = TokenManager