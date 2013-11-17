var events = new require('events')
  , tee    = new events.EventEmitter()
  , db     = require('level')('../loltext.db')
  , bot    = require('../lib/bot')(tee, db);

describe('ocw bot', function() {

  beforeEach(function() {
    //
    // Spy on the bot's say function and the random lol function. Spying on the
    //    random lol function will prevent outgoing requests.
    //
    spyOn(bot, 'say');
  });

  it('should send a lol for intelligrated specific words', function() {
    bot.client.emit('message', 'test', 'test', 'intelligrated');

    expect(bot.say).wasCalled();
  });
});
