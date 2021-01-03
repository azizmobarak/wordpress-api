var unirest = require("unirest");
const { Post, Download } = require('./post');
const dotenv = require('dotenv').config();

const GetArticles = async(category, category_ID, tags, lang) => {

    var req = unirest("GET", process.env.API_URL);

    req.query({
        "q": category,
        "language": lang
    });

    req.headers({
        "x-rapidapi-key": process.env.API_KEY,
        "x-rapidapi-host": process.env.API_HOST,
        "useQueryString": true
    });


    await req.end(async function(res) {
        if (res.error) throw new Error(res.error);

        console.log("res",res)
        console.log("res.data",res.data)
        console.log("res.data.results",res.data.results)
        var Data = await res.body.data.results;

         await Data.map((item, i) => {
            setTimeout(async() => {
                await Download(item.image, i)
                    .then((name) => {
                        console.log("index of " + name);
                    })
            }, 1000*i);
        });

        //console.log('hello')

        setTimeout(async() => {
            try {
                await Data.forEach((element, index) => {
                    var timeout = (parseInt(index) + 1) * 10000
                    console.log(timeout)
                    setTimeout(() => {
                        var _tags = tags == [0] ? tags : [1, 2]
                         Post(element.title, category_ID, _tags, element.description, element.source_name, index)

                    }, timeout);
                })
            } catch (err) {
                console.log(err);
            }
        }, 20000);

    });

}
module.exports = { GetArticles }