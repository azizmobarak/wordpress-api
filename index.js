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
var count =0;

// cron.schedule('00 */1 * * *', () => {
    
// });

setTimeout(() => {
    GetArticles(All_Keys[count], All_Categories, All_tags, lang);
    count++;
    if(count==7){count = 0}
},10000);

app.listen(2010);