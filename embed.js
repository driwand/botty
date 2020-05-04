const Discord = require('discord.js');

module.exports = {
    create_embed ,
    sad_embed
}

function create_embed(data, counteps)
{
    var list_genres = data.genres;
    const res = list_genres.map(el => el.name).join(', ');

    let episodes
    if (!counteps)
        episodes = data.episodes
    else if (counteps && data.episodes)
        episodes = `${counteps}/${data.episodes}`
    else if (counteps && !data.episodes)
        episodes = `${counteps}/?`
    
    const embed = new Discord.MessageEmbed()
    .setColor('#353535')
    .setTitle(data.title, data.url)
    .setAuthor('goshujin-sama okaairi nasaaai! I choosed this for you!', 'https://vignette.wikia.nocookie.net/shounen-maid/images/6/6e/Chihiro_infobox.png')
    .setDescription('did you like it?')
    .setThumbnail('https://vignette.wikia.nocookie.net/shounen-maid/images/6/6e/Chihiro_infobox.png')
    .addFields(
        { name: 'score', value: data.score, inline: true },
        { name: 'members', value: data.members, inline: true },
        { name: 'episodes', value: episodes, inline: true },
    )
    .addField('genres', res, true)
    .setImage(data.image_url)
    .setTimestamp()
    .setFooter('anatano botty <3', 'https://vignette.wikia.nocookie.net/shounen-maid/images/6/6e/Chihiro_infobox.png');
    return (embed)
}

function sad_embed()
{
    const embed = new Discord.MessageEmbed()
    .setTitle("goshujin-sama gomee!")
    .setAuthor("botty", 'https://pbs.twimg.com/profile_images/758277734845915137/Xe8UUiit_400x400.jpg')
    .setColor('#353535')
    .setDescription("try again!")
    .setThumbnail('https://pbs.twimg.com/profile_images/758277734845915137/Xe8UUiit_400x400.jpg')
    return embed
}