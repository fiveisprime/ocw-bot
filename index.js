var irc = require('irc');

//
// Initialize the bot with a new IRC client instance.
//
require('./lib/bot')(new irc.Client('irc.freenode.net', 'lolbot', {
  channels: ['#outofcontrolware']
}));
