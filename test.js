
'use strict';
const { Client, MessageAttachment } = require('discord.js');

const Jikan = require('jikan-node');
const mal = new Jikan();

const client = new Client();
const Discord = require('discord.js');
var i = 0;

const fetch = require('cross-fetch')
const URL = require('url').URL


client.on('ready', () => {
    console.log('I am ready!');
  });
  
  client.on('message', (message) => {
      if (message.author == client.user) {
          return 
      }
      if (message.content == "test") {
          var obj = new JikanNode();
          obj.search("anime", "my teen")
              .then(
                  function(data){
                      console.log(data)
                  }
              )
      }
  });  
  

class JikanNode {

    constructor() {
        this.request = new Request
    }
    async search(type, title, param) {
        const params = {'q': title, ...param}
        return await this.request.send(['search', type], params)

    }
}

class Request {
    constructor(){
        this.baseURL = "https://api.jikan.moe/v3"
    }
    
    async send(args, params) {
        var res = await fetch(this.createUrl(args, params))
        var data = await res.json()
        if (res.status !== 200) throw `Response: ${res.status}`
        else return data
    }

    createUrl (args, params) {
        const url = new URL(this.baseURL)
        url.pathname += `/${args.filter(a => a).join("/")}`
            for (let p in params) {
                if (params[p]) {
                    url.searchParams.set(p, params[p])
            }
        }
        return url.href
    }
}



client.login('Njk5Njk0Njc1NjI3NjA2MDY4.XpYHmg.bS9H_7CdK3hmDtPD_12775zJh3c');