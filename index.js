var irc   = require('irc')
  , level = require('level');

var client = new irc.Client('irc.freenode.net', 'lolbot', {
  channels: ['#outofcontrolware']
});

var db = level('./loltext.db');

//
// Initialize the bot with a new IRC client instance.
//
require('./lib/bot')(client, db);
