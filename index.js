const express = require('express');
const { GetArticles } = require('./getArticles');
const app = express();
const Dotenv = require('dotenv').config();
const cron = require('node-cron');

var cat1 = [parseInt(process.env.CAT1)];
var cat2 = [parseInt(process.env.CAT2)];
var cat3 = [parseInt(process.env.CAT3)];
var cat4 = [parseInt(process.env.CAT4)];
var cat5 = [parseInt(process.env.CAT5)];
var cat6 = [parseInt(process.env.CAT6)];
var cat7 = [parseInt(process.env.CAT7)];

var tags = process.env.TAGS
var lang = process.env.LANG.toString().substring(0, 2)

var keys1 = process.env.KEY1;
var keys2 = process.env.KEY2;
var keys3 = process.env.KEY3;
var keys4 = process.env.KEY4;
var keys5 = process.env.KEY5;
var keys6 = process.env.KEY6;
var keys7 = process.env.KEY7;


// format keywords

function FormatKeys(keys1){
 var KEYS = [];
 var Format_tags = keys1.split(',')
Format_tags.forEach(element => {
    KEYS.push(element);
});
return KEYS;
}


var All_Keys1 = FormatKeys(keys1);
var All_Keys2 = FormatKeys(keys2);
var All_Keys3 = FormatKeys(keys3);
var All_Keys4 = FormatKeys(keys4);
var All_Keys5 = FormatKeys(keys5);
var All_Keys6 = FormatKeys(keys6);
var All_Keys7 = FormatKeys(keys7);


// start program



//Economy
var count =0;
cron.schedule('00 */2 * * *', () => {
    All_Keys = FormatKeys(keys1)
     GetArticles(All_Keys1[count],cat1, [1,2], lang);
   count++;
    if(count==All_Keys1.length){count = 0}    
});

        
// market data
var num = 0;
 cron.schedule('5 */2 * * *', () => {
    GetArticles(All_Keys2[num], cat2,  [1,2], lang);
    num++;
    if(num==All_Keys2.length){num = 0}    
 });


 // teach economy
 var num2 = 0;
 cron.schedule('10 */2 * * *', () => {
    GetArticles(All_Keys3[num2], cat3,  [1,2], lang);
    num2++;
    if(num2==All_Keys3.length){num2 = 0}    
 });

 

 //entreprenur ship
 var num3 = 0;
  cron.schedule('15 */2 * * *', () => {
     GetArticles(All_Keys4[num3],cat4,  [1,2], lang);
     num3++;
     if(num3==All_Keys4.length){num3 = 0}    
  });


//companies
var num4 = 0;
cron.schedule('20 */2 * * *', () => {
     GetArticles(All_Keys5[num4],cat5,  [1,2], lang);
     num4++;
     if(num4==All_Keys5.length){num4 = 0}    
});


//car industry
var num5 = 0;
cron.schedule('25 */2 * * *', () => {
     GetArticles(All_Keys6[num5],cat6,  [1,2], lang);
     num5++;
     if(num5==All_Keys6.length){num5 = 0}    
});

//business of sport
var num6 = 0;
cron.schedule('30 */2 * * *', () => {
     GetArticles(All_Keys7[num6],cat7,  [1,2], lang);
     num6++;
     if(num6==All_Keys7.length){num6 = 0}    
});


app.listen(2010);