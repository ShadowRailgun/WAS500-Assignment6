const Books = require("../models/booksmod");

exports.getAllBooks = (req, res, next) => {
  Books.find({}, (error, books) => {
    if (error) next(error);
    req.data = books;
    next();
  });
};

exports.getBookLoadPage = (req, res) => {
  res.render("loadbook");
};

exports.saveBooks = (req, res) => {
  let newBooks = new Books({
    name: req.body.name,
    page: req.body.page,
    description: req.body.description,
    img: req.body.img,
  });
  newBooks.save((error, result) => {
    if (error) res.send(error);
    console.log("Success")
  });
};

exports.getbooks = (req, res, next) => {
    let paramsName = req.params.bookID;
    console.log(req.params)
    Books.findOne({page: paramsName}, (error, book) => {
        if (error) next(error);
        console.log(book)
        req.data = book;
        next();
      });
    
    //res.render("bookpage");
};