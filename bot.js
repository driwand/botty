
'use strict';

const client = require('./modules');
const token = require('./token');
const request = require('./request');

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', (message) => {
    if (message.author == client.user) {
        return
    }
    if (message.content.startsWith("!")) {
        manageCommand(message)
    }
});

function manageCommand(msg) {
    let fullCommand = msg.content.substr(1)
    let cmd = fullCommand.split(' ')[0]
    let arg = fullCommand.split(' ').splice(1).join(' ');

    if (cmd == "help")
        request.handlehelp(msg)
    else if (cmd == "anime")
        request.handleanime(msg, cmd, arg)
    else if (cmd == "genres")
        request.handlegenres(msg, arg)
    else if (cmd == "season")
        request.handleseason(msg, arg)
}

client.login(token.name);
