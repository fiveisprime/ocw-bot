var irc = require('irc');

require('./lib/bot')(new irc.Client('irc.freenode.net', 'lolbot', {
  channels: ['#outofcontrolware']
}));
