var events = new require('events');
var assert = require('assert');
var sinon  = require('sinon');
var Lab    = require('lab');

var lab    = exports.lab = Lab.script();
var tee    = new events.EventEmitter();
var bot    = null;

var describe = lab.experiment;
var it       = lab.test;

describe('ocw bot', function() {

  it('should initialize with no errors', function (done) {
    assert.doesNotThrow(function () {
      bot = require('../lib/bot')(tee);
    });

    assert(typeof bot, 'object');

    done();
  });

  it('should send a lol for icw specific words', function (done) {
    bot.say = sinon.spy();
    bot.client.emit('message', 'test', 'test', 'icw');

    assert(bot.say.calledOnce, true);
    done();
  });

  it('should send a lol for certain names', function (done) {
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

    assert(bot.say.called, true);
    assert(bot.say.callCount, 15);

    done();
  });

  it('should handle private messages', function (done) {
    bot.client.say = sinon.spy();
    bot.handlePm('test');

    assert(bot.client.say.called, true);

    done();
  });

  it('should output urban dictionary definitions', function (done) {
    bot.sayUrbanDictionaryDefinition = sinon.spy();
    bot.client.emit('message', 'test', 'test', '!ud test message');

    assert(bot.sayUrbanDictionaryDefinition.called, true);
    bot.sayUrbanDictionaryDefinition.calledWith(['test', 'message']);

    done();
  });
});
