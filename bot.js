
'use strict';

const { Client } = require('discord.js');
const token = require('./token');
const request = require('./request');
const anime = require('./fetch');
const embed = require('./embed');

const client = new Client();

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
        handleanime(msg, cmd, arg)
    else if (cmd == "genres")
        request.handlegenres(msg, arg)
    else if (cmd == "season")
        request.handleseason(msg, arg)
}

var check = 0

function handleanime(msg, cmd, arg) {
    setTimeout(function () {
        anime.getanime(cmd, arg)
            .then(function (data) {
                var res = data.results.slice(0, 5);
                var i = 0
                var clicked = 0
                
                if (!check)
                    while (i < 5)
                    {
                        if (data.results[i].title.toUpperCase().startsWith(arg.toUpperCase()))
                            check++;
                        i++;
                    }
                if (check == 1 && data.results[0].title.toUpperCase() == arg.toUpperCase()) {
                    var id = data.results[0].mal_id;
                    anime.getanimebyid(id)
                        .then(function (result) {
                            msg.channel.send(embed.create_embed(result))
                        })
                    check = 0
                }
                else {
                    var usr_id = msg.author.id;
                    msg.channel.send("1 - " + res[0].title + " \n" +
                        "2 - " + res[1].title + " \n" +
                        "3 - " + res[2].title + " \n" +
                        "4 - " + res[3].title + " \n" +
                        "5 - " + res[4].title + " \n")

                        .then(function (message) {
                            message.react('1️⃣')
                            message.react('2️⃣')
                            message.react('3️⃣')
                            message.react('4️⃣')
                            message.react('5️⃣')
                        })
                    
                    client.on('messageReactionAdd', async (reaction, user) => {
                        if (reaction.partial)
                        {
                            try {
                                await reaction.fetch()
                            } catch (error) {
                                console.log("fetching reaction faild!")
                                return
                            }
                        }
                        let emoji = reaction.emoji;
                        if (user.id == usr_id)
                        {
                            if (!clicked && emoji.name == '1️⃣') {
                                handleanime(msg, "anime", res[0].title)
                                check = 1
                                clicked = 1;
                            }
                            else if (!clicked && emoji.name == '2️⃣') {
                                handleanime(msg, "anime", res[1].title)
                                check = 1
                                clicked = 1;
                            }
                            else if (!clicked && emoji.name == '3️⃣') {
                                handleanime(msg, "anime", res[2].title)
                                check = 1
                                clicked = 1;
                            }
                            else if (!clicked && emoji.name == '4️⃣') {
                                handleanime(msg, "anime", res[3].title)
                                check = 1
                                clicked = 1;
                            }
                            else if (!clicked && emoji.name == '5️⃣') {
                                handleanime(msg, "anime", res[4].title)
                                check = 1
                                clicked = 1;
                            }
                        }
                    });
                }
            })
            .catch(err => console.log(err));
    }, 4000);
}

client.login(token.name);