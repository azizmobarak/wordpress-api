const express = require('express');
const app = express();
const Dotenv = require('dotenv').config();
const cron = require('node-cron');
const mongoose = require('mongoose');
const {GetArticles} = require('./getArticles');

mongoose.connect(process.env.DATABASE,{ useNewUrlParser: true , useUnifiedTopology: true },(err)=>{
if(err) console.log(err);
else{
}
});

var id1 = [parseInt(process.env.ID1)];
var id2 = [parseInt(process.env.ID2)];
var id3 = [parseInt(process.env.ID3)];
var id4 = [parseInt(process.env.ID4)];
var id5 = [parseInt(process.env.ID5)];
var id6 = [parseInt(process.env.ID6)];
var id7 = [parseInt(process.env.ID7)];
var id8 = [parseInt(process.env.ID8)];
var id9 = [parseInt(process.env.ID9)];
var id10 = [parseInt(process.env.ID10)];
var id11 = [parseInt(process.env.ID11)];
var id12 = [parseInt(process.env.ID12)];
var id13 = [parseInt(process.env.ID13)];
var id14 = [parseInt(process.env.ID14)];
var id15 = [parseInt(process.env.ID15)];
var id16 = [parseInt(process.env.ID16)];
var id17 = [parseInt(process.env.ID17)];
var id18 = [parseInt(process.env.ID18)];
var id19 = [parseInt(process.env.ID19)];
// var cat20 = [parseInt(process.env.CAT20)];


// retrieve categories
var cat1 = process.env.CAT1;
var cat2 = process.env.CAT2;
var cat3 = process.env.CAT3;
var cat4 = process.env.CAT4;
var cat5 = process.env.CAT5;
var cat6 = process.env.CAT6;
var cat7 = process.env.CAT7;
var cat8 = process.env.CAT8;
var cat9 = process.env.CAT9;
var cat10 = process.env.CAT10;
var cat11 = process.env.CAT11;
var cat12 = process.env.CAT12;
var cat13 = process.env.CAT13;
var cat14 = process.env.CAT14;
var cat15 = process.env.CAT15;
var cat16 = process.env.CAT16;
var cat17 = process.env.CAT17;
var cat18 = process.env.CAT18;
var cat19 = process.env.CAT19;


// start program

// cat 1
cron.schedule('04 */1 * * *', () => {
 GetArticles(cat1,id1);
});


//cat 2
   cron.schedule('07 */1 * * *', () => {
     GetArticles(cat2,id2);
 });


 //cat 3
  cron.schedule('10 */1 * * *', () => {
     GetArticles(cat3,id3);
 });



 //cat 4
  cron.schedule('14 */1 * * *', () => {
     GetArticles(cat4,id4);
  });


//cat 5
cron.schedule('18 */1 * * *', () => {
     GetArticles(cat5,id5);
});


//cat 6
cron.schedule('22 */1 * * *', () => {
     GetArticles(cat6,id6);
});


//cat 7
cron.schedule('27 */1 * * *', () => {
     GetArticles(cat7,id7);
});


// cat 8
cron.schedule('30 */1 * * *', () => {
     GetArticles(cat8,id8);
});


// cat 9
cron.schedule('33 */1 * * *', () => {
     GetArticles(cat9,id9);
});


// cat 10
cron.schedule('37 */1 * * *', () => {
     GetArticles(cat10,id10);
});


// cat 11
cron.schedule('41 */1 * * *', () => {
     GetArticles(cat11,id11);
});

// cat 12
cron.schedule('45 */1 * * *', () => {
     GetArticles(cat12,id12);
});


cron.schedule('47 */1 * * *', () => {
     GetArticles(cat13,id13);
});


cron.schedule('50 */1 * * *', () => {
     GetArticles(cat14,id14);
});


cron.schedule('52 */1 * * *', () => {
     GetArticles(cat15,id16);
});


cron.schedule('54 */1 * * *', () => {
     GetArticles(cat16,id17);
});

// ----
cron.schedule('56 */1 * * *', () => {
     GetArticles(cat17,id18);
});

cron.schedule('58 */1 * * *', () => {
     GetArticles(cat18,id18);
});

cron.schedule('01 */1 * * *', () => {
     GetArticles(cat19,id19);
});


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


app.listen(2030);