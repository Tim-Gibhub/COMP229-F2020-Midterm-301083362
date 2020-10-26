/* 
Filename:       books.js
Student’s Name: Jiyuan Huang 
StudentID:      301083362
Date:           OCT 26,2020
Web App name:   COMP229-F2020-301083362
This for DB Schema.
*/
let mongoose = require('mongoose');

// create a model class
let Book = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "booklist"
});

module.exports = mongoose.model('Book', Book);
