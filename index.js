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



// start program
var All_Keys=key;
var count =0;
console.log(key)
 cron.schedule('* */2 * * *', () => {
    GetArticles(All_Keys[count], All_Categories, All_tags, lang);
    count++;
    if(count==7){count = 0}
});

app.listen(2020);