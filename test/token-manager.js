var assert = require('assert'),
    sinon = require('sinon'),
    
    fs = require ('fs'),
    readline = require('readline'),
    
    TokenManager = require('../src/token-manager')

describe('TokenManager', function () {
  context('constructor', function () {
    it('prepares to read a file in the parent directory named "tokens" if not supplied with parameters', function () {
      assert.doesNotThrow(function () {
        let tm = new TokenManager()
      })
      let tm = new TokenManager()
      assert.equal(tm.filePath, '../tokens')
    })
    it('prepares to read a file with the given path if supplied with a filePath', function () {
      assert.doesNotThrow(function () {
        let tm = new TokenManager('example-tokens/empty-tokens')
      })
      let tm = new TokenManager('example-tokens/empty-tokens')
      assert.equal(tm.filePath, 'example-tokens/empty-tokens')
    })
  })
  context('parseTokens()', function () {
    it('exposes an associative array of API tokens if successful, where each key is the name of the service', function () {
      assert.doesNotThrow(function () {
        let tm = new TokenManager().parseTokens()
      })
      let tm = new TokenManager().parseTokens().then(function () {
        assert.notEqual(tm.tokens['discord'], undefined)
      })
      
      assert.doesNotThrow(function () {
        let tm = new TokenManager().parseTokens()
      })
      tm = new TokenManager().parseTokens().then(function () {
        assert.equal(tm.tokens['discord'], 'loremIpsum19391jfjjAf8') 
      })
    })
  })
})