var automeme = require('automeme');
var faces    = require('cool-ascii-faces');
var util     = require('util');
var request  = require('request');
//
// Bot constructor. Accepts the IRC client object for use with the bot.
//
function Bot(client) {
  this.client  = client;
  this.channel = '#outofcontrolware';
  this.texts   = require('../data/texts');
  this.wat     = require('../data/wat');
  this.counter = 1;

  this.lols = [
    'lol',
    'lolol',
    'lol!',
    'lolz',
    'lawl',
    'lawls',
    'the athore comments are totale liesssss',
    'jerk',
    'Blaaaaaaaaaaaaam this piece of crap!',
    'hahaha',
    '༼ つ ◕_◕ ༽つ',
    '(╯°□°）╯︵ ┻━┻)'
  ];
  this.scott = [
    'Captain Incompetent to the...rescue?',
    'do it in powerpoint',
    'I have 20 yrs of UI experience!',
    'I\'m a sure bet for Dunning-Kruger Champion 2014! Gonna continue my streak...'
  ];
  this.shane = [
    'I lost too many hog riders in Clash of Clans last night.',
    'Baseball....blarg....baseball....blarg....football....blarg.....football',
    'Compiler errors? Those are merely suggestions. You can safely ignore them.',
    'They\'ll take the penant because their number one pitcher has an ERA of 0.00.'
  ];
  this.webbuilder = [
    'InsanityBuilder',
    'UlcerBuilder',
    'FrustrationBuilder',
    'NotAResumeBuilder',
    'AppendicitisBuilder',
    'AlcoholicBuilder',
    'AngerBuilder',
    'HeadacheBuilder',
    'MigraineBuilder',
    'DepressionBuilder',
    'TimeSuckBuilder'
  ];

  if (typeof this.client.addListener !== 'undefined') {
    this.client.on = this.client.addListener;
  }

  //
  // Bind events.
  // ===
  //
  // this.client.on('join', this.handleJoin.bind(this));
  this.client.on('message', this.handleMessage.bind(this));
  this.client.on('pm', this.handlePm.bind(this));
  this.client.on('error', console.error.bind(this, 'IRC error:'));
}

//
// Say something to a user that just connected.
//
// Bot.prototype.handleJoin = function(channel, nick) {
//   var say = this.say.bind(this);
// 
//   //
//   // Don't talk to yourself, lolbot.. that's weird.
//   //
//   if (/lolbot/gi.test(nick)) {
//     return;
//   }
// 
//   automeme.getMeme()
//     .then(function(meme) {
//       say('hey ' + nick + ', ' + meme.toLowerCase().replace('\n', ''));
//     })
//     .fail(console.error)
//     .done();
// };

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
    ~~(Math.random() * 2) ? this.sayType('texts') : this.sayMeme();
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
    var bits = text.split(' ');

    if (bits.length >= 2) {
      this.sayType('texts', bits[1]);
    } else {
      this.sayType('texts');
    }
  }

  if (/!ud/gi.test(text)) {
    var udBits = text.split(' ');
    if (udBits.length >= 2) {
      this.sayUrbanDictionaryDefinition(udBits[1]);
    }
  }

  if (/\b(wat)\b/gi.test(text)) {
    var watBits = text.split(' ');

    if (watBits.length >= 2) {
      this.sayType('wat', watBits[1]);
    } else {
      this.sayType('wat');
    }
  }
  if (/\b(shane)\b/gi.test(text)) {
    this.say( this.shane[~~(Math.random() * this.shane.length)]);
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
// Write out the specified type of lol.
//
Bot.prototype.sayType = function (type, search) {
  if (search) {
    var filtered = this[type].filter(function (text) {
      return text.indexOf(search) >= 0;
    });

    if (filtered.length) {
      return this.say(filtered[~~(Math.random() * filtered.length)]);
    }
  }

  this.say(this[type][~~(Math.random() * this[type].length)]);
};

//
// Write out a random definition entry from urban dictionary for a given word.
//
Bot.prototype.sayUrbanDictionaryDefinition = function (word) {
  var that = this;
  var url ='http://api.urbandictionary.com/v0/define?term=' + word;
  request(url, function(err, resp, body) {
    if (err) {console.log(err);}
    if (body) {
      var defJSON=JSON.parse(body);
      var index=(~~(Math.random() * defJSON.list.length));
      if (defJSON.list.length > 0 && defJSON.list[index] && defJSON.list[index].hasOwnProperty('definition')) {
        that.say('UD definition for \"'+word+'\": '+defJSON.list[index].definition);
      }
      if (defJSON.list.length > 0 && defJSON.list[index] && defJSON.list[index].hasOwnProperty('example')) {
        that.say('UD usage for \"'+word+'\": '+defJSON.list[index].example);
      }
    }
  });
};

//
// Initialize a new Bot instance using the specified IRC client object.
//
module.exports = function(client, db) {
  return new Bot(client, db);
};
