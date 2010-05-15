#!/usr/bin/env node

// Make sure the irc lib is available
require.paths.unshift(__dirname + '/../lib');

var sys = require('sys');
var irc = require('irc');
var http = require('http');

var bot = new irc.Client('irc.dollyfish.net.nz', 'nodebot', {
    debug: true,
    channels: ['#blah', '#test'],
});

bot.addListener('message#blah', function (from, message) {
    sys.puts('<' + from + '> ' + message);
});

bot.addListener('message', function (from, to, message) {
    sys.puts(from + ' => ' + to + ': ' + message);

    if ( to.match(/^[#&]/) ) {
        // channel message
        if ( message.match(/hello/i) ) {
            bot.send('PRIVMSG', to, 'Hello there');
        }
        if ( message.match(/dance/) ) {
            setTimeout(function () { bot.send("PRIVMSG", to, "\u0001ACTION dances: :D\\-<\u0001") }, 1000);
            setTimeout(function () { bot.send("PRIVMSG", to, "\u0001ACTION dances: :D|-<\u0001") }, 2000);
            setTimeout(function () { bot.send("PRIVMSG", to, "\u0001ACTION dances: :D/-<\u0001") }, 3000);
            setTimeout(function () { bot.send("PRIVMSG", to, "\u0001ACTION dances: :D|-<\u0001") }, 4000);
        }
    }
    else {
        // private message
    }
});
bot.addListener('pm', function(nick, message) {
    sys.puts('Got private message from ' + nick + ': ' + message);
});
bot.addListener('join', function(channel, who) {
    sys.puts(who + ' has joined ' + channel);
});
bot.addListener('part', function(channel, who, reason) {
    sys.puts(who + ' has left ' + channel + ': ' + reason);
});
bot.addListener('kick', function(channel, who, by, reason) {
    sys.puts(who + ' was kicked from ' + channel + ' by ' + by + ': ' + reason);
});
