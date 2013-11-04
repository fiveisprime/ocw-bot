var events = new require('events')
  , tee = new events.EventEmitter()
  , bot = require('../lib/bot')(tee);

describe('ocw bot', function() {

  beforeEach(function() {
    spyOn(bot, 'say');
    spyOn(bot, 'getRandomLol').andCallFake(function() {
      return arguments[0]('test lol');
    });
  });

  it('should send a message on join', function() {
    bot.client.emit('join', '#channel', 'test');

    expect(bot.say).wasCalled();
  });

  it('should send a lol for intelligrated specific words', function() {
    bot.client.emit('message', 'test', 'test', 'intelligrated');

    expect(bot.say).wasCalled();
  });
});
