const express = require("express"),
  app = express(),
  errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController"),
  layouts = require("express-ejs-layouts");
const booksController = require("./controllers/booksController");
const mongoose = require("mongoose")
const methodOverride = require("method-override")
require("dotenv").config()
const uri = process.env.ATLAS_URI;
//console.log(uri)
mongoose.connect(uri, { useUnifiedTopology: true });
const db = mongoose.connection;
//db.once("open", ()=> {
//  console.log("Success")
//})

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);
app.use(express.static("public"));
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(homeController.logRequestPaths);

app.get("/home", homeController.home);
app.get("/", homeController.home);
app.get("/books/:bookID", booksController.getbooks, (req, res) =>{
  console.log(req.data)
  res.render("bookpage", {s: req.data})
});
app.get("/honesty", homeController.honesty);

app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
});

app.get(
  "/booklist", booksController.getAllBooks, (req, res) =>{
    console.log(req.data);
    res.render("booklist", {Books: req.data});
  }
);

app.get(
  "/admin", booksController.getAllBooks, (req, res) =>{
    console.log(req.data);
    res.render("admin", {Books: req.data});
  }
);

app.get("/addnewbook", (req, res) => {
  res.render('loadbook')
})
app.post("/subscribe", booksController.saveBooks, booksController.redirectView)

app.get("/edit/:bookID", booksController.getbooks, (req, res) => {
  res.render('edit', {s: req.data})
})
app.post("/books/:bookID/update", booksController.updateBook, booksController.redirectView);
app.get("/delete/:bookID", booksController.getbooks, (req, res) => {
  res.render('delete', {s: req.data})
})
app.post("/books/:bookID/delete", booksController.delBook, booksController.redirectView)
app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.typeError);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});