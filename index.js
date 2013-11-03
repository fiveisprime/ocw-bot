var irc     = require('irc')
  , request = require('request')
  , lols = ['lol', 'lolol', 'lol!', 'lolz', 'lawl', 'lawls', 'the athore comments are totale liesssss', 'jerk', 'hahaha'];

var bot = new irc.Client('irc.freenode.net', 'lolbot', {
  channels: ['#outofcontrolware']
});

//
// Because I hate the addListener weirdness...
//
bot.on = bot.addListener;

//
// Gets a random lol from automeme and returns the result to the callback.
//
var getRandomLol = function(fn) {
  request('http://api.automeme.net/text?lines=1', function(err, response, body) {
    if (!err && response.statusCode === 200) {
      return fn(null, body.toLowerCase().replace('\n', ''));
    }

    return fn(err, null);
  });
};

bot.on('join', function(channel, nick) {
  getRandomLol(function(err, out) {
    bot.say(channel, err || ('hey ' + nick + ', ' + out));
  });
});

bot.on('message', function(from, to, text) {
  if (/ocw|icw|intelligrated|java/gi.test(text)) bot.say(to, lols[~~(Math.random() * lols.length)]);

  if (/ross/gi.test(text)) bot.say(to, 'omg... lol');

  if (/test/gi.test(text)) bot.say(to, 'testing is for noobs lol');

  if (/jamie/gi.test(text)) bot.say(to, 'your opinion has been noted ' + lols[~~(Math.random() * lols.length)]);

  if (/merge|merging/gi.test(text)) bot.say(to, 'wasting all day in SVN, huh? lol');

  if (/ken/gi.test(text)) bot.say(to, 'he\'s got those moves like ken mcjagger.. lol');

  if (/scott|ux/gi.test(text)) bot.say(to, 'just do it in powerpoint ' + lols[~~(Math.random() * lols.length)]);

  if (/beer/gi.test(text)) bot.say(to, 'I\'ll take one too');

  if (/emacs/gi.test(text)) bot.say(to, 'lol code         formatting. ..');

  if (/peter/gi.test(text)) bot.say(to, 'he\'s the coolest');

  if (/meerkat|meekrat/gi.test(text)) bot.say(to, 'JamieScript ' + lols[~~(Math.random() * lols.length)]);

  if (/lolbot/gi.test(text)) getRandomLol(function(err, out) { bot.say(to, err || out); });
});
