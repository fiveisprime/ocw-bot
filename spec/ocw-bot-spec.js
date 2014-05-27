var events = new require('events');
var sinon  = require('sinon');
var tee    = new events.EventEmitter();
var bot    = null;

describe('ocw bot', function() {

  it('should initialize with no errors', function() {
    (function() {
      bot = require('../lib/bot')(tee);
    }).should.not.throw();
  });

  it('should send a lol for icw specific words', function() {
    bot.say = sinon.spy();
    bot.client.emit('message', 'test', 'test', 'icw');

    bot.say.calledOnce.should.be.true;
  });

  it('should send a lol for certain names', function() {
    bot.say = sinon.spy();
    bot.client.emit('message', 'test', 'test', 'scott');
    bot.client.emit('message', 'test', 'test', 'jamie');
    bot.client.emit('message', 'test', 'test', 'ken');
    bot.client.emit('message', 'test', 'test', 'mike');
    bot.client.emit('message', 'test', 'test', 'taco');
    bot.client.emit('message', 'test', 'test', 'ross');
    bot.client.emit('message', 'test', 'test', 'beer');
    bot.client.emit('message', 'test', 'test', 'peter');
    bot.client.emit('message', 'test', 'test', 'emacs');
    bot.client.emit('message', 'test', 'test', 'meerkat');
    bot.client.emit('message', 'test', 'test', 'webbuilder');
    bot.client.emit('message', 'test', 'test', 'doug');
    bot.client.emit('message', 'test', 'test', '!text');
    bot.client.emit('message', 'test', 'test', '!text the');
    bot.client.emit('message', 'test', 'test', 'wat');

    bot.say.called.should.be.true;
    bot.say.callCount.should.equal(15);
  });

  it('should handle private messages', function() {
    bot.client.say = sinon.spy();
    bot.handlePm('test');

    bot.client.say.called.should.be.true;
  });

  it('should output urban dictionary definitions', function () {
    bot.sayUrbanDictionaryDefinition = sinon.spy();
    bot.client.emit('message', 'test', 'test', '!ud test message');

    bot.sayUrbanDictionaryDefinition.called.should.be.true;
    bot.sayUrbanDictionaryDefinition.calledWith(['test', 'message']);
  });
});
