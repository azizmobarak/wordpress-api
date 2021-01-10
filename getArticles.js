var unirest = require("unirest");
const { Post, Download } = require('./post');
const dotenv = require('dotenv').config();
const fetch = require('node-fetch');
const axios = require("axios");

const GetArticles = async(category, category_ID, tags, lang) => {

    const options = {
        method: 'GET',
        url: process.env.API_URL,
        params: {q: category, language: "en"},
        headers: {
          'x-rapidapi-key': process.env.API_KEY,
          'x-rapidapi-host': process.env.API_HOST
        }
      };
      
      axios.request(options).then(async function (response) {

        // getting data
         var Data = await response.data.data.results;
         // downloding images 
          await Data.map((item, i) => {
             setTimeout(async() => {
                 await Download(item.image, i)
                     .then((name) => {
                         console.log("index of " + name);
                     })
             }, 1000*i);
         });
 
 
         // insert all data to website
         setTimeout(async() => {
             try {
                 await Data.forEach((element, index) => {
                     var timeout = (parseInt(index) + 1) * 10000
                     console.log(timeout)
                     setTimeout(() => {
                         var _tags = tags == [0] ? tags : [1, 2]
                         if(typeof element.description!="undefined"){
                            Post(element.title, category_ID, _tags, element.description, element.source_name,element.url, index)
                         }
                     }, timeout);
                 })
             } catch (err) {
                 console.log(err);
             }
         }, 20000);

      }).catch(function (error) {
          console.error(error);
      });
}
module.exports = { GetArticles }