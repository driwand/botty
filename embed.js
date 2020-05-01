const Discord = require('discord.js');

module.exports = {
    create_embed ,
    sad_embed
}

function create_embed(data)
{
    var list_genres = data.genres;
    const res = list_genres.map(el => el.name).join(', ');

    const embed = new Discord.MessageEmbed()
    .setColor('#353535')
    .setTitle(data.title, data.url)
    .setAuthor('goshujin-sama okaairi nasaaai! I choosed this for you!', 'https://vignette.wikia.nocookie.net/shounen-maid/images/6/6e/Chihiro_infobox.png')
    .setDescription('did you like it?')
    .setThumbnail('https://vignette.wikia.nocookie.net/shounen-maid/images/6/6e/Chihiro_infobox.png')
    .addFields(
        { name: 'score', value: data.score, inline: true },
        { name: 'members', value: data.members, inline: true },
        { name: 'episodes', value: data.episodes, inline: true },
    )
    .addField('genres', res, true)
    .setImage(data.image_url)
    .setTimestamp()
    .setFooter('anatano botty <3', 'https://ih0.redbubble.net/image.702318777.9332/poster,840x830,f8f8f8-pad,1000x1000,f8f8f8.jpg');
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