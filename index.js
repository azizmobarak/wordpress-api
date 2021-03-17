const express = require('express');
const app = express();
const Dotenv = require('dotenv').config();
const cron = require('node-cron');
const mongoose = require('mongoose');
const {GetArticles} = require('./getArticles');
const Article = require('./articles');
const moment = require('moment');

mongoose.connect(process.env.DATABASE,{ useNewUrlParser: true , useUnifiedTopology: true },(err)=>{
if(err) console.log(err);
else{
    console.log('new code')
}
});

var cat1 = [parseInt(process.env.CAT1)];
var cat2 = [parseInt(process.env.CAT2)];
var cat3 = [parseInt(process.env.CAT3)];
var cat4 = [parseInt(process.env.CAT4)];
var cat5 = [parseInt(process.env.CAT5)];
var cat6 = [parseInt(process.env.CAT6)];
var cat7 = [parseInt(process.env.CAT7)];
// var cat8 = [parseInt(process.env.CAT8)];
// var cat9 = [parseInt(process.env.CAT9)];
// var cat10 = [parseInt(process.env.CAT10)];
// var cat11 = [parseInt(process.env.CAT11)];
// var cat12 = [parseInt(process.env.CAT12)];
// var cat13 = [parseInt(process.env.CAT13)];
// var cat14 = [parseInt(process.env.CAT14)];
// var cat15 = [parseInt(process.env.CAT15)];
// var cat16 = [parseInt(process.env.CAT16)];
// var cat17 = [parseInt(process.env.CAT17)];
// var cat18 = [parseInt(process.env.CAT18)];
// var cat19 = [parseInt(process.env.CAT19)];
// var cat20 = [parseInt(process.env.CAT20)];

var tags = process.env.TAGS
var lang = process.env.LANG.toString().substring(0, 2)

var keys1 = process.env.KEY1;
var keys2 = process.env.KEY2;
var keys3 = process.env.KEY3;
var keys4 = process.env.KEY4;
var keys5 = process.env.KEY5;
var keys6 = process.env.KEY6;
var keys7 = process.env.KEY7;
// var keys8 = process.env.KEY8;
// var keys9 = process.env.KEY9;
// var keys10 = process.env.KEY10;
// var keys11 = process.env.KEY11;
// var keys12 = process.env.KEY12;
// var keys13 = process.env.KEY13;
// var keys14 = process.env.KEY14;
// var keys15 = process.env.KEY15;
// var keys16 = process.env.KEY16;
// var keys17 = process.env.KEY17;
// var keys18 = process.env.KEY18;
// var keys19 = process.env.KEY19;
// var keys20 = process.env.KEY20;


// format keywords

function FormatKeys(keys){
 var arr_KEYS = [];
 var Format_tags = keys.split(',')
Format_tags.forEach(element => {
   arr_KEYS.push(element);
});
return arr_KEYS;
}

// get formated keys
try{
var All_Keys1 = FormatKeys(keys1);
var All_Keys2 = FormatKeys(keys2);
var All_Keys3 = FormatKeys(keys3);
var All_Keys4 = FormatKeys(keys4);
var All_Keys5 = FormatKeys(keys5);
var All_Keys6 = FormatKeys(keys6);
var All_Keys7 = FormatKeys(keys7);
// var All_Keys8 = FormatKeys(keys8);
// var All_Keys9 = FormatKeys(keys9);
// var All_Keys10 = FormatKeys(keys10);
// var All_Keys11 = FormatKeys(keys11);
// var All_Keys12 = FormatKeys(keys12);
// var All_Keys13 = FormatKeys(keys13);
// var All_Keys14 = FormatKeys(keys14);
// var All_Keys15 = FormatKeys(keys15);
// var All_Keys16 = FormatKeys(keys16);
// var All_Keys17 = FormatKeys(keys17);
// var All_Keys18 = FormatKeys(keys18);
// var All_Keys19 = FormatKeys(keys19);
// var All_Keys20 = FormatKeys(keys20);
// }catch(err){
//      console.log(err);
 }catch(err){
      console.log(err)
 }


// start program

         

// cat 1
  var count =0;
 cron.schedule('00 */3 * * *', () => {
 GetArticles(All_Keys1[count],cat1);
    count++;
    if(count==All_Keys1.length){count = 0}    
});

        
// cat 2
var num = 0;
 cron.schedule('05 */3 * * *', () => {
  GetArticles(All_Keys2[num], cat2);
    num++;
    if(num==All_Keys2.length){num = 0}    
 });


//  cat 3
  var num2 = 0;
 cron.schedule('05 */3 * * *', () => {
   GetArticles(All_Keys3[num2], cat3);
     num2++;
    if(num2==All_Keys3.length){num2 = 0}    
 });

 

//  cat 4
 var num3 = 0;
  cron.schedule('15 */3 * * *', () => {
 GetArticles(All_Keys4[num3],cat4);
     num3++;
     if(num3==All_Keys4.length){num3 = 0}    
  });


// cat 5
     var num4 = 0;
cron.schedule('20 */3 * * *', () => {
    GetArticles(All_Keys5[num4],cat5);
     num4++;
     if(num4==All_Keys5.length){num4 = 0}    
});



// cat 6
var num5 = 2;
//cron.schedule('25 */3 * * *', () => {
     GetArticles(All_Keys6[num5],cat6);
     num5++;
     if(num5==All_Keys6.length){num5 = 0}    
//});


// cat 7
var num6 = 0;
cron.schedule('30 */3 * * *', () => {
     GetArticles(All_Keys7[num6],cat7);
     num6++;
     if(num6==All_Keys7.length){num6 = 0}    
});


// // cat 8
//  var num7 = 0;
// cron.schedule('35 15 */2 * *', () => {
//      GetArticles(All_Keys8[num7],cat8,[1,2], lang);
//      num7++;
//      if(num7==All_Keys8.length){num7 = 0}    
// });


// // cat 9
//  var num8 = 0;
// cron.schedule('40 16 */2 * *', () => {
//      GetArticles(All_Keys9[num8],cat9,  [1,2], lang);
//      num8++;
//      if(num8==All_Keys9.length){num8 = 0}    
// });


// // cat 10
//  var num9 = 0;
// cron.schedule('45 17 */2 * *', () => {
//    GetArticles(All_Keys10[num9],cat10,  [1,2], lang);
//      num9++;
//      if(num9==All_Keys10.length){num9 = 0}    
// });


// // cat 11
//  var num10 = 0;
// cron.schedule('50 18 */2 * *', () => {
//      GetArticles(All_Keys11[num10],cat11,  [1,2], lang);
//      num10++;
//      if(num10==All_Keys11.length){num10 = 0}    
// });

// // cat 12
//        var num11 = 0;
// cron.schedule('55 19 */2 * *', () => {
//         GetArticles(All_Keys12[num11],cat12,  [1,2], lang);
//      num11++;
//      if(num11==All_Keys12.length){num11 = 0}    
// });


// // cat 13
// var num12 = 0;
// cron.schedule('55 20 */2 * *', () => {
//       GetArticles(All_Keys13[num12],cat13,[1,2],lang);
//      num12++;
//      if(num12==All_Keys13.length){num12 = 0}    
// });


// // cat 14
// var num13 = 0;
// cron.schedule('55 21 */2 * *', () => {
//       GetArticles(All_Keys14[num13],cat14,[1,2], lang);
//      num13++;
//      if(num13==All_Keys14.length){num13 = 0}    
// });


// // cat 15
// var num14 = 0;
// cron.schedule('55 22 */2 * *', () => {
//       GetArticles(All_Keys15[num14],cat15,[1,2], lang);
//      num14++;
//      if(num14==All_Keys15.length){num14 = 0}    
// });


// // cat 16
// var num15 = 0;
// cron.schedule('55 23 */2 * *', () => {
//       GetArticles(All_Keys16[num15],cat16,  [1,2], lang);
//      num15++;
//      if(num15==All_Keys16.length){num15 = 0}    
// });


// // cat 17
// var num16 = 0;
// cron.schedule('55 00 */2 * *', () => {
//       GetArticles(All_Keys17[num16],cat17,  [1,2], lang);
//      num16++;
//      if(num16==All_Keys17.length){num16 = 0}    
// });


// // cat 18
// var num17 = 0;
// cron.schedule('55 1 */2 * *', () => {
//       GetArticles(All_Keys18[num17],cat18,  [1,2], lang);
//      num17++;
//      if(num17==All_Keys18.length){num17 = 0}    
// });


// // cat 19
// var num18 = 0;
// cron.schedule('55 2 */2 * *', () => {
//       GetArticles(All_Keys19[num18],cat19,  [1,2], lang);
//      num18++;
//      if(num18==All_Keys19.length){num18 = 0}    
// });


// // cat 20
// var num19 = 0;
// cron.schedule('55 3 */2 * *', () => {
//       GetArticles(All_Keys20[num19],cat20,  [1,2], lang);
//      num19++;
//      if(num19==All_Keys20.length){num19 = 0}    
// });


app.listen(2070);
