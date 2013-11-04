var events = new require('events')
  , tee    = new events.EventEmitter()
  , bot    = require('../lib/bot')(tee);

describe('ocw bot', function() {

  beforeEach(function() {
    //
    // Spy on the bot's say function and the random lol function. Spying on the
    //    random lol function will prevent outgoing requests.
    //
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
