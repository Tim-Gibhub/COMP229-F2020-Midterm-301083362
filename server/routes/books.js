/* 
Filename:       books.js
Student’s Name: Jiyuan Huang 
StudentID:      301083362
Date:           OCT 26,2020

This for pages control.
*/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  let AddBook = book({  
     });
      res.render('books/details', {
        title: 'Add Book',
        books: AddBook 
      });
   

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  let books = book({
    "Title": req.body.title,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
});

book.create(books, (err, book) => {
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    res.redirect('/books');
});

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  let id = req.params.id;
  // pass id to the db 
  book.findById(id, (err, BookToEdit) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      // show the edit view
      res.render('books/details', { title: 'Update Book', books: BookToEdit });
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
  let id = req.params.id;
     // instantiate a new object of type Component
     let updatedBook = book({
        "_id": id, 
        "Title": req.body.title,
        "Price": req.body.price,
        "Author": req.body.author,
        "Genre": req.body.genre
    });

    book.updateOne({_id: id}, updatedBook, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        res.redirect('/books');
    });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  let id = req.params.id;
  book.remove({_id: id}, (err) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      res.redirect('/books');
  });
});


module.exports = router;
