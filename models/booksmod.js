const mongoose = require("mongoose"),
  bookSchema = mongoose.Schema({
    name: String,
    page: String,
    description: String,
    author: String,
    img: String,
  });
module.exports = mongoose.model("Books", bookSchema);