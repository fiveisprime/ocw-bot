var request = require('request');

//
// Bot constructor. Accepts the IRC client object for use with the bot.
//
function Bot(client) {
  this.client = client;
  this.channel = '#outofcontrolware';
  this.lols = [
    'lol'
  , 'lolol'
  , 'lol!'
  , 'lolz'
  , 'lawl'
  , 'lawls'
  , 'the athore comments are totale liesssss'
  , 'jerk'
  , 'hahaha'
  ];
  this.webbuilder = [
    'InsanityBuilder'
  , 'UlcerBuilder'
  , 'FrustrationBuilder'
  , 'NotAResumeBuilder'
  , 'AppendicitisBuilder'
  , 'AlcoholicBuilder'
  , 'AngerBuilder'
  , 'HeadacheBuilder'
  , 'MigraineBuilder'
  , 'DepressionBuilder'
  , 'TimeSuckBuilder'
  ];
  if (typeof this.client.addListener !== 'undefined') this.client.on = this.client.addListener;

  //
  // Bind the events for `join` and `message`.
  //
  this.client.on('join', this.handleJoin.bind(this));
  this.client.on('message', this.handleMessage.bind(this));
}

//
// Say something to a user that just connected.
//
Bot.prototype.handleJoin = function(channel, nick) {
  var _this = this;

  //
  // Don't talk to yourself, lolbot.. that's weird.
  //
  if (/lolbot/.test(nick)) return;

  this.getRandomLol(function(err, out) {
    _this.say(err || ('hey ' + nick + ', ' + out));
  });
};

//
// Process an incoming message and lol if necessary.
//
Bot.prototype.handleMessage = function(from, to, text) {
  var _this = this;
  if (/ocw|icw|intelligrated|java/gi.test(text)) this.say(this.lols[~~(Math.random() * this.lols.length)]);

  if (/ross/gi.test(text)) this.say('omg... lol');

  if (/test/gi.test(text)) this.say('testing is for noobs lol');

  if (/jamie/gi.test(text)) this.say('your opinion has been noted ' + this.lols[~~(Math.random() * this.lols.length)]);

  if (/merge|merging/gi.test(text)) this.say('wasting all day in SVN, huh? lol');

  if (/ken/gi.test(text)) this.say('he\'s got those moves like ken mcjagger.. lol');

  if (/scott|ux/gi.test(text)) this.say('just do it in powerpoint ' + this.lols[~~(Math.random() * this.lols.length)]);

  if (/beer/gi.test(text)) this.say('I\'ll take one too');

  if (/emacs/gi.test(text)) this.say('lol code         formatting. ..');

  if (/peter/gi.test(text)) this.say('he\'s the coolest');

  if (/meerkat|meekrat/gi.test(text)) this.say('JamieScript ' + this.lols[~~(Math.random() * this.lols.length)]);

  if (/webbuilder/gi.test(text)) this.say('oh! you mean ' + this.webbuilder[~~(Math.random() * this.webbuilder.length)] + ' , right?');

  if (/lolbot/gi.test(text)) this.getRandomLol(function(err, out) { _this.say(err || out); });
};

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
