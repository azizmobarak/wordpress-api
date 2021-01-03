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
 //cron.schedule('* */2 * * *', () => {
    GetArticles(key, All_Categories, All_tags, lang);
//});

app.listen(2020);