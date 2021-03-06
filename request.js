
const m_genres = require('./genres');
const embed = require('./embed');
const anime = require('./fetch');
const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js');
const  client  = require('./modules.js');

function handlehelp(msg) {
    var help = "**!anime:** informations about a given anime\n"+ 
    "**!genres:** a random anime of a given catagory \n";
    msg.channel.send(help)
}

async function load(res, check) {
    const canvas = Canvas.createCanvas(700, 345+25+25);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = "#2C2F33"
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#2C2F33';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    // text

    var title = res.title
    var res1;
    var res2;
    let fontSize = 26;
    

    ctx.font = `20px sans-serif`;
    if (title.length > 43)
    {
        var middle = Math.floor(title.length / 2);
        var before = title.lastIndexOf(' ', middle);
        var after = title.indexOf(' ', middle + 1);

        if (middle - before < after - middle) {
            middle = before;
        } else {
            middle = after;
        }

        res1 = title.substr(0, middle);
        res2 = title.substr(middle + 1);
        do {
            ctx.font = `${fontSize -= 1}px sans-serif`;
        } while (ctx.measureText(res1).width > canvas.width - 300);
    }
    ctx.fillStyle = '#ffffff';
    if (res1)
    {
        ctx.fillText(res1, 250 + 10 , 50 + 25);
        ctx.fillText(res2, 250 + 10 , 72 + 25);
    }else
        ctx.fillText(title, 250 + 10 , 50 + 25);

    
    ctx.font = `bold 20px sans-serif`;
    ctx.fillText("Score", 250 + 10 , 120 + 25);
    ctx.font = `20px sans-serif`;
    ctx.fillText(res.score, 250 + 10 + 60 , 120 + 25);
    ctx.strokeStyle
    ctx.font = `bold 25px sans-serif`;
    ctx.fillText(`TOP ${check + 1}`, 25 , 30);
    const poster = await Canvas.loadImage(res.image_url);
    ctx.drawImage(poster, 25, 50, 225, 320);

    const attachment = await new MessageAttachment(canvas.toBuffer(), 'infos.png');
    return (attachment)
}


var check = 0
let usr_id
let titles
let send

function handleanime(msg, cmd, arg, choose) {
    send = msg
    console.log(check)
    setTimeout(function () {
        anime.getanime(cmd, arg)
            .then(function (data) {
                var res = data.results.slice(0, 5);
                var i = 0
                let id = 0

                titles = res.map((tl) => tl.title)
                
                if (!check)
                    while (i < 5) {
                        if (data.results[i].title.toUpperCase().startsWith(arg.toUpperCase()))
                            check++;
                        i++;
                    }
                if (choose)
                    id = data.results.find(x => x.title === arg).mal_id
                if (id || ((check == 1) && data.results[0].title.toUpperCase() == arg.toUpperCase())) {
                    if (id == 0)
                        id = data.results[0].mal_id;
                    anime.getanimebyid(id)
                        .then(function (result) {
                            if (result.airing)
                            {
                                let last_ep 
                                anime.getepisodes(id, 0)
                                    .then(function (eps) {
                                        if (eps.episodes_last_page > 1)
                                        {
                                            anime.getepisodes(id, eps.episodes_last_page)
                                                .then(function (last) {
                                                    last_ep = last.episodes[last.episodes.length - 1].episode_id
                                                    msg.channel.send(embed.create_embed(result, last_ep))
                                                })
                                        } else {
                                            last_ep = eps.episodes[eps.episodes.length - 1].episode_id
                                            msg.channel.send(embed.create_embed(result, last_ep))
                                        }
                                    })
                            }else
                                msg.channel.send(embed.create_embed(result, 0))
                        })
                    check = 0
                }
                else {
                    usr_id = msg.author.id;
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
                }
            })
            .catch(err => console.log(err));
    }, 4000);
}

let clicked = 0

client.on('messageReactionAdd', async (reaction, user) => {
    let emoji = reaction.emoji;

    if (user.id == usr_id)
    {
        if (!clicked && emoji.name == '1️⃣') {
            handleanime(send, "anime", titles[0], 1)
            check = 1
            clicked = 1;
        }
        else if (!clicked && emoji.name == '2️⃣') {
            handleanime(send, "anime", titles[1], 1)
            check = 1
            clicked = 1;
        }
        else if (!clicked && emoji.name == '3️⃣') {
            handleanime(send, "anime", titles[2], 1)
            check = 1
            clicked = 1;
        }
        else if (!clicked && emoji.name == '4️⃣') {
            handleanime(send, "anime", titles[3], 1)
            check = 1
            clicked = 1;
        }
        else if (!clicked && emoji.name == '5️⃣') {
            handleanime(send, "anime", titles[4], 1)
            check = 1
            clicked = 1;
        }
    }
});

async function handleseason(msg, arg)
{
    let animes;
    let date = arg.split(' ')
    
    if (arg) {
        animes = await anime.getseson(date[0], date[1]);
    } else {
        animes = await anime.getseson();
    }
    animes.forEach(async (el, i) => {
        try {
            const att = await load(el, i);
            msg.channel.send(att);
        } catch (error) {
            console.log(error);
        }
    });
}

function handlegenres(msg, arg) {
    const args = arg.toUpperCase();

    let id = m_genres.name[args];
    if (!id) {
        msg.channel.send(embed.sad_embed());
        return
    }
    setTimeout(function () {
        anime.getgenre(id)
            .then(function (data) {
                var index = Math.floor(Math.random() * data.anime.length);
                msg.channel.send(embed.create_embed(data.anime[index]));
            })
            .catch(err => console.log(err));
    }, 4000);
}

module.exports = {
    handlehelp,
    handleanime,
    handlegenres,
    handleseason
}