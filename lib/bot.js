var automeme = require('automeme')
  , faces    = require('cool-ascii-faces')
  , texts    = require('../data/texts')
  , util     = require('util')
  , wat      = require('../data/wat');

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
  , 'Blaaaaaaaaaaaaam this piece of crap!'
  , 'hahaha'
  , '༼ つ ◕_◕ ༽つ'
  , '(╯°□°）╯︵ ┻━┻)'
  ];
  this.scott = [
    'Captain Incompetent to the...rescue?'
  , 'do it in powerpoint'
  , 'I have 20 yrs of UI experience!'
  , 'I\'m a sure bet for Dunning-Kruger Champion 2014! Gonna continue my streak...'
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
  this.counter = 1;

  if (typeof this.client.addListener !== 'undefined') {
    this.client.on = this.client.addListener;
  }

  //
  // Bind events.
  // ===
  //
  this.client.on('join', this.handleJoin.bind(this));
  this.client.on('message', this.handleMessage.bind(this));
  this.client.on('pm', this.handlePm.bind(this));
  this.client.on('error', console.error.bind(this, 'IRC error:'));
}

//
// Say something to a user that just connected.
//
Bot.prototype.handleJoin = function(channel, nick) {
  var say = this.say.bind(this);

  //
  // Don't talk to yourself, lolbot.. that's weird.
  //
  if (/lolbot/gi.test(nick)) {
    return;
  }

  automeme.getMeme()
    .then(function(meme) {
      say('hey ' + nick + ', ' + meme.toLowerCase().replace('\n', ''));
    })
    .fail(console.error)
    .done();
};

//
// Process an incoming message and lol if necessary.
//
Bot.prototype.handleMessage = function(from, to, text) {
  if (/\b(ocw|icw|java|svn)\b/gi.test(text)) {
    this.say(this.lols[~~(Math.random() * this.lols.length)]);
  }

  if (/\b(ross)\b/gi.test(text)) {
    this.say('omg... lol');
  }

  if (/\b(jamie)\b/gi.test(text)) {
    this.say(util.format(
      'your opinion has been noted %s',
      this.lols[~~(Math.random() * this.lols.length)]
    ));
  }

  if (/\b(ken)\b/gi.test(text)) {
    this.say('he\'s got those moves like ken mcjagger.. lol');
  }

  if (/\b(ux)\b/gi.test(text)) {
    this.say(util.format(
      'just do it in powerpoint %s',
      this.lols[~~(Math.random() * this.lols.length)]
    ));
  }

  // Don't mix up the Scotts!
  if (/\b(c scott|c. scott)\b/gi.test(text)) {
    this.say('he\'s even cooler than Peter!');
  } else if (/\b(scott)\b/gi.test(text)) {
    this.say( this.scott[~~(Math.random() * this.scott.length)]);
  }

  if (/\b(beer)\b/gi.test(text)) {
    this.say('I\'ll take one too');
  }

  if (/\b(emacs)\b/gi.test(text)) {
    this.say('lol   code         formatting. ..');
  }

  if (/\b(peter)\b/gi.test(text)) {
    this.say('he\'s the coolest');
  }

  if (/\b(meerkat|meekrat)\b/gi.test(text)) {
    this.say('JamieScript ' + this.lols[~~(Math.random() * this.lols.length)]);
  }

  if (/\b(webbuilder)\b/gi.test(text)) {
    this.say(util.format(
      'oh! you mean %s, right?',
      this.webbuilder[~~(Math.random() * this.webbuilder.length)]));
  }

  if (/lolbot/gi.test(text)) {
    ~~(Math.random() * 2) ? this.sayText() : this.sayMeme();
  }

  if (/\b(mike)\b/gi.test(text)) {
    this.say('I am NOT slow.');
  }

  if (/\b(doug)\b/gi.test(text)) {
    this.say('The Doug has spoken.');
  }

  if (/\b(taco)\b/gi.test(text)) {
    this.say('Nobody told me it was a requirement.');
  }

  if (/!text/gi.test(text)) {
    this.sayText();
  }

  if (/\b(wat)\b/gi.test(text)) {
    this.sayWat();
  }

  if (this.counter++ === 100) {
    this.say(faces());
    this.counter = 1;
  }
};

//
// Handle private messages sent to the bot.
//
Bot.prototype.handlePm = function(from) {
  this.client.say(from, 'I\'m just a bot.. don\'t ask me :(');
};

//
// Write the specified message to the default channel.
//
Bot.prototype.say = function(msg) {
  return this.client.say(this.channel, msg);
};

//
// Write a random meme out to the channel.
//
Bot.prototype.sayMeme = function() {
  var say = this.say.bind(this);

  return automeme.getMeme()
    .then(function(meme) {
      say(meme.toLowerCase().replace('\n', ''));
    })
    .fail(console.error)
    .done();
};

//
// Write out a random text.
//
Bot.prototype.sayText = function() {
  this.say(texts[~~(Math.random() * texts.length)]);
};

//
// Write out a wat.
//
Bot.prototype.sayWat = function() {
  this.say(wat[~~(Math.random() * wat.length)]);
};

//
// Initialize a new Bot instance using the specified IRC client object.
//
module.exports = function(client, db) {
  return new Bot(client, db);
};
