
'use strict';

const { Client, MessageAttachment } = require('discord.js');
const fetch = require("node-fetch");
const Jikan = require('jikan-node');
const m_genres = require('./genres');
const embed = require('./embed');
const token = require('./token');

const mal = new Jikan();

const client = new Client();
const Discord = require('discord.js');
var i = 0;

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

function manageCommand(msg)
{
    let fullCommand = msg.content.substr(1)
    let cmd = fullCommand.split(' ')[0]
    let arg = fullCommand.split(' ').splice(1).join(' ');

    if (cmd == "help")
        handlehelp(msg, cmd, arg)
    else if (cmd == "anime")
        handleanime(msg, cmd, arg)
    else if (cmd == "genres")
        handlegenres(msg, cmd, arg)
}

function handlehelp(arg)
{

}

const get = async (type, title) => {
    return await mal.search(type, title, "type"); 
};

const getanimebyid = async (id) => {
    const res = await fetch(`https://api.jikan.moe/v3/anime/${id}`)
    return await res.json()
};

const getgnr = async (id) => {
    return await mal.findGenre("anime", id, 1); 
};

function handleanime(msg, cmd, arg)
{
    setTimeout(function(){
        get(cmd, arg)
        .then(function(data){
            if (data.results[0].title.toUpperCase() == arg.toUpperCase())
            {
                var id = data.results[0].mal_id;
                console.log(id)
                getanimebyid(id)
                    .then(function (result){
                            msg.channel.send(embed.create_embed(result))
                        })
            }
            else
                var res = data.results.slice(0, 5);
        })
        .catch(err => console.log(err));
     }, 4000);
}

function handlegenres(msg, cmd, arg)
{
    const args = arg.toUpperCase();

    let id = m_genres.name[args];
    if (!id)
    {
        msg.channel.send(embed.sad_embed());
        return
    }
    setTimeout(function(){
        getgnr(id)
        .then(function(data){
            var index = Math.floor(Math.random() * data.anime.length);
            msg.channel.send(embed.create_embed(data.anime[index]));
        })
        .catch(err => console.log(err));
    }, 4000);
}

client.login(token.name);