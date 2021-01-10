const express = require('express');
const { GetArticles } = require('./getArticles');
const app = express();
const Dotenv = require('dotenv').config();
const cron = require('node-cron');

var categories = process.env.CAT;
var tags = process.env.TAGS
var lang = process.env.LANG.toString().substring(0, 2)
var key = process.env.KEY;

// categories formating
var Format_Categories = categories.split(',')
var All_Categories = [];

Format_Categories.forEach(element => {
    All_Categories.push(parseInt(element));
});

//tags formating
var Format_tags = tags.split(',')
var All_tags = [];

Format_tags.forEach(element => {
    All_tags.push(parseInt(element));
});


// categories formating
var format_keys = key.split(',')
var All_Keys = [];

format_keys.forEach(element => {
    All_Keys.push(element);
});


// start program

//business

var count =0;

cron.schedule('00 */1 * * *', () => {
     GetArticles(All_Keys[count], All_Categories, All_tags, lang);
   count++;
    if(count==All_Keys.length){count = 0}    
});

        
// technology
var num = 0;
var Technology_Keys = ['tech','technology','robot','bot','space','science','tesla','nasa','teach','future','feature','digital','science','programing','script','elon mask','microsoft','computer','system']
var Technology_categories =[2]
 cron.schedule('15 */1 * * *', () => {
    GetArticles(Technology_Keys[num], Technology_categories, All_tags, lang);
    num++;
    if(num==Technology_Keys.length){num = 0}    
 });


 // mobile
 var num2 = 0;
var mobile_Keys = ['mobile','iphone','samsung','hwawi','intel','5G','apple','nokia','phone','smart phone','android','ios','apps','mobile games','play store','app store','tablet']
var mobile_categories =[4]
 cron.schedule('30 */1 * * *', () => {
    GetArticles(mobile_Keys[num2], mobile_categories, All_tags, lang);
    num2++;
    if(num2==mobile_Keys.length){num2 = 0}    
 });

 

 //media
 var num3 = 0;
 var media_Keys = ['media','news','trending','newspaper','fox','bbc','post','newyorktimes','washington post','cnbc','reuiters','breaking news','fox news','mbc','aljazeera','world news']
 var media_categories =[3]
  cron.schedule('45 */1 * * *', () => {
     GetArticles(media_Keys[num3],media_categories, All_tags, lang);
     num3++;
     if(num3==media_Keys.length){num3 = 0}    
  });


app.listen(2010);