var irc = require('irc');

var client = new irc.Client('irc.freenode.net', 'lolbot', {
  channels: ['#outofcontrolware']
});

//
// Initialize the bot with a new IRC client instance.
//
require('./lib/bot')(client);
