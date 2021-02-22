var unirest = require("unirest");
const { Post, Download } = require('./post');
const dotenv = require('dotenv').config();
const Articles = require('./articles');
const moment = require('moment');

const GetArticles = async(category, category_ID, tags, lang) => {

var date = moment().subtract(1,'day').toDate();
var article = Articles();
       article.find(
          {$and :
            [ {$or : [{'articleTitle':  {'$regex': category} },{'articleDescription': {'$regex': category} }]},
              {articleCreatedDate : {$gte:date}}
            ]}
           ,async(err,doc)=>{
         if(err) console.log(err);
         else{
              
         // getting data
         var Data = doc;
         // downloding images 
        await Data.map((item, i) => {
          try{
            console.log("show",item.articleImageURL)
            var url ="";

            if(item.articleImageURL==="" || item.articleImageURL==null || typeof(item.articleImageURL)==="undefined"){
                url = "https://ichef.bbci.co.uk/news/385/cpsprodpb/83B3/production/_115651733_breaking-large-promo-nc.png";
                 console.log('new url downloaded')
            }

            if(item.articleImageURL.indexOf('.jpg')!=-1){
              url = item.articleImageURL.substring(0,item.articleImageURL.indexOf('.jpg')+4)
            }else{
                if(item.articleImageURL.indexOf('.png')!=-1){
                    url = item.articleImageURL.substring(0,item.articleImageURL.indexOf('.jpg')+4)
                }else{
                    if(item.articleImageURL.indexOf('.jpeg')!=-1){
                        url = item.articleImageURL.substring(0,item.articleImageURL.indexOf('.jpg')+4)
                    }          
                }
            }
             setTimeout(async() => {
                try{
                await Download(url, i)
                    .then((name) => {
                        console.log("index of " + name);
                    })
                }catch(e){
                  console.log('error here 1 ',e)
                }
             }, 1000*i);
          }catch{
           console.log("error here 2 ",item.articleImageURL)
          }
         });
 
 



         // insert all data to website
         setTimeout(async() => {
             try {
                 await Data.forEach((element, index) => {
                     var timeout = (parseInt(index) + 1) * 10000
                     console.log(timeout)
                     setTimeout(() => {
                         var _tags = tags == [0] ? tags : [1, 2]
                         Post(element.articleTitle, category_ID, _tags, element.articleDescription, element.mediaName,element.articleSourceLink, index)
                     }, timeout);
                 })
             } catch (err) {
                 console.log(err);
             }
         }, 20000);


         }
    })

       

}
module.exports = { GetArticles }