var automeme = require('automeme');

//
// Bot constructor. Accepts the IRC client object for use with the bot.
//
function Bot(client, db) {
  this.client = client;
  this.db = db;
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
  this.client.on('pm', this.handlePm.bind(this));

  this.db.get('lolcount', function(err, count) {
    this.lolcount = err ? 0 : count;
  }.bind(this));
}


//
// Say something to a user that just connected.
//
Bot.prototype.handleJoin = function(channel, nick) {
  var say = this.say.bind(this);

  //
  // Don't talk to yourself, lolbot.. that's weird.
  //
  if (/lolbot/.test(nick)) return;

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
  if (/ocw|icw|intelligrated|java|svn/gi.test(text)) this.say(this.lols[~~(Math.random() * this.lols.length)]);

  if (/ross/gi.test(text)) this.say('omg... lol');

  if (/jamie/gi.test(text)) this.say('your opinion has been noted ' + this.lols[~~(Math.random() * this.lols.length)]);

  if (/ken/gi.test(text)) this.say('he\'s got those moves like ken mcjagger.. lol');

  if (/scott|ux/gi.test(text)) this.say('just do it in powerpoint ' + this.lols[~~(Math.random() * this.lols.length)]);

  if (/beer/gi.test(text)) this.say('I\'ll take one too');

  if (/emacs/gi.test(text)) this.say('lol   code         formatting. ..');

  if (/peter/gi.test(text)) this.say('he\'s the coolest');

  if (/meerkat|meekrat/gi.test(text)) this.say('JamieScript ' + this.lols[~~(Math.random() * this.lols.length)]);

  if (/webbuilder/gi.test(text)) this.say('oh! you mean ' + this.webbuilder[~~(Math.random() * this.webbuilder.length)] + ', right?');

  if (/lolbot/gi.test(text)) ~~(Math.random() * 2) ? this.sayText() : this.sayMeme();

  if (/dot dot dot/gi.test(text)) this.say('a review by axman13.. years old http://youtu.be/4Z2Z23SAFVA');

  if (/mike/gi.test(text)) this.say('I am NOT slow.');

  if (/doug/gi.test(text)) this.say('The Doug has spoken.');

  if (/taco/gi.test(text)) this.say('Nobody told me it was a requirement.');

  if (/!text/gi.test(text)) this.sayText();
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
// Grab a random text from last night from the loltext.db database and say the
//    result to the channel.
//
Bot.prototype.sayText = function() {
  this.db.get(~~(Math.random() * this.lolcount), function(err, text) {
    if (err) return;
    this.say(text);
  }.bind(this));
};

//
// Initialize a new Bot instance using the specified IRC client object.
//
module.exports = function(client, db) {
  return new Bot(client, db);
};
