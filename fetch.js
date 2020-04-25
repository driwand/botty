const fetch = require("node-fetch");
const Jikan = require('jikan-node');
const mal = new Jikan();

const getanime = async (type, title) => {
    return await mal.search(type, title, "type");
};

const getanimebyid = async (id) => {
    const res = await fetch(`https://api.jikan.moe/v3/anime/${id}`)
    return await res.json()
};

const getgenre = async (id) => {
    return await mal.findGenre("anime", id, 1);
};

const getseson = async (season, year) => {
    let yr 
    var sn

    if (year && season)
    {
        yr = year
        sn = season 
    } else {
        const dt = new Date()
        yr = dt.getFullYear()
        if (dt.getMonth() >= 0 && dt.getMonth() <= 2)
            sn = "winter"
        else if (dt.getMonth() >= 3 && dt.getMonth() <= 5)
            sn = "spring"
        else if (dt.getMonth() >= 6 && dt.getMonth() <= 8)
            sn = "summer"
        else if (dt.getMonth() >= 9 && dt.getMonth() <= 11)
            sn = "fall"
    }
    try {
        const res = await mal.findSeason(sn, yr);
        const animes = res.anime;
        return animes
          .filter((el) => el.continuing === false)
          .sort((a, b) => b.score - a.score)
          .slice(0, 10);
    } catch (error) {
        console.log(error)
    }
};

module.exports = {
    getanime,
    getanimebyid,
    getgenre,
    getseson
}