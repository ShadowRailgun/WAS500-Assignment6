const Books = require("../models/booksmod");

module.exports = {
  getAllBooks: (req, res, next) => {
    Books.find({}, (error, books) => {
      if (error) next(error);
      req.data = books;
      next();
    });
  },
  saveBooks: (req, res, next) => {
    let newBooks = new Books({
      name: req.body.name,
      author: req.body.author
    });
    newBooks.save((error, result) => {
      if (error) res.send(error);
      console.log("Success")
      res.locals.redirect = "/admin"
      next();
    });
  },
  updateBook: (req, res,next) => {
    let params_book_id = req.params.bookID;
    console.log(req.params.id)
    Books.findByIdAndUpdate(params_book_id, {
      name: req.body.name,
      author: req.body.author
    },(error, book) => {
        if (error) next(error);
        console.log(book)
        req.data = book;
        res.locals.redirect = "/admin"
        next();
    });
  },
  delBook: (req, res,next) => {
    let params_book_id = req.params.bookID;
    console.log(req.params.id)
    Books.findByIdAndDelete({_id:params_book_id}, (error, book) => {
        if (error) next(error);
        console.log(book)
        req.data = book;
        res.locals.redirect = "/admin"
        next();
    });
  },
  getbooks: (req, res, next) => {
    let params_book_id = req.params.bookID;
    console.log(req.params.id)
    Books.findById({_id: params_book_id}, (error, book) => {
        if (error) next(error);
        console.log(book)
        req.data = book;
        next();
      });
    
    //res.render("bookpage");
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
}
