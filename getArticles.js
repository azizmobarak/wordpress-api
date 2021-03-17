var unirest = require("unirest");
const { Post, Download } = require('./post');
const dotenv = require('dotenv').config();
const Articles = require('./articles');
const moment = require('moment');

const GetArticles = async(category,ID) => {

var date = moment().subtract(1,'day').toDate();
var lang = process.env.LANG.substring(0,2);

console.log(lang)

var article = Articles();
       article.find(
          {$and :
            [ {$or : [{'articleTitle':  {'$regex': category} },{'articleDescription': {'$regex': category} }]},
              {articleCreatedDate : {$gte:date}},{articleLanguage:lang},{articleImageURL:{$ne:null}}
            ]}
           ,async(err,doc)=>{
         if(err) console.log(err);
         else{
              
         // getting data
         var Data = doc;
         console.log(Data.length)
         // downloding images 
        await Data.map((item, i) => {
          try{
            console.log("show",item.articleImageURL)
            var url =item.articleImageURL;
            var other_url = "https://ichef.bbci.co.uk/news/385/cpsprodpb/83B3/production/_115651733_breaking-large-promo-nc.png";

            if(item.articleImageURL==="" || item.articleImageURL==null || typeof(item.articleImageURL)==="undefined"){
                url = "https://ichef.bbci.co.uk/news/385/cpsprodpb/83B3/production/_115651733_breaking-large-promo-nc.png";
                 console.log('new url downloaded')
            }


          if(url.indexOf('jpg')!=-1 || url.indexOf('jpeg')!=-1 || url.indexOf('png')!=-1){
              setTimeout(async() => {
                console.log(url)
               try{
               await Download(url,item,ID,i)
                   .then((name) => {
                       console.log("index of " + name);
                   })
               }catch(e){
                 console.log('error here 1 ',e)
                 await Download(other_url,item,ID,i)
                   .then((name) => {
                       console.log("index of " + name);
                   });
               }
               console.log('it will take about '+5000*i)
            }, 5000*i);
            }else{
              console.log('not inserted')
            }

          }catch{
           console.log("error here 2 ",item.articleImageURL)
          }
         });

         }
    }).limit(40);
}




module.exports = { GetArticles }