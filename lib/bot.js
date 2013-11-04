var request = require('request')
  , lols = ['lol', 'lolol', 'lol!', 'lolz', 'lawl', 'lawls', 'the athore comments are totale liesssss', 'jerk', 'hahaha'];

//
// Bot constructor. Accepts the IRC client object for use with the bot.
//
function Bot(client) {
  var _this = this;

  this.client = client;
  this.channel = '#outofcontrolware';

  if (typeof this.client.addListener !== 'undefined') this.client.on = this.client.addListener;

  this.client.on('join', function(channel, nick) {
    _this.getRandomLol(function(err, out) {
      _this.say(err || ('hey ' + nick + ', ' + out));
    });
  });

  this.client.on('message', function(from, to, text) {
    if (/ocw|icw|intelligrated|java/gi.test(text)) _this.say(lols[~~(Math.random() * lols.length)]);

    if (/ross/gi.test(text)) _this.say('omg... lol');

    if (/test/gi.test(text)) _this.say('testing is for noobs lol');

    if (/jamie/gi.test(text)) _this.say('your opinion has been noted ' + lols[~~(Math.random() * lols.length)]);

    if (/merge|merging/gi.test(text)) _this.say('wasting all day in SVN, huh? lol');

    if (/ken/gi.test(text)) _this.say('he\'s got those moves like ken mcjagger.. lol');

    if (/scott|ux/gi.test(text)) _this.say('just do it in powerpoint ' + lols[~~(Math.random() * lols.length)]);

    if (/beer/gi.test(text)) _this.say('I\'ll take one too');

    if (/emacs/gi.test(text)) _this.say('lol code         formatting. ..');

    if (/peter/gi.test(text)) _this.say('he\'s the coolest');

    if (/meerkat|meekrat/gi.test(text)) _this.say('JamieScript ' + lols[~~(Math.random() * lols.length)]);

    if (/lolbot/gi.test(text)) _this.getRandomLol(function(err, out) { _this.say(err || out); });
  });
}

//
// Gets a random lol from automeme and returns the result to the callback.
//
Bot.prototype.getRandomLol = function(fn) {
  request('http://api.automeme.net/text?lines=1', function(err, response, body) {
    if (!err && response.statusCode === 200) {
      return fn(null, body.toLowerCase().replace('\n', ''));
    }

    return fn(err, null);
  });
};

//
// Write the specified message to the default channel.
//
Bot.prototype.say = function(msg) {
  return this.client.say(this.channel, msg);
};

//
// Initialize a new Bot instance using the specified IRC client object.
//
module.exports = function(client) {
  return new Bot(client);
};
