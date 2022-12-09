const mongoose = require("mongoose"),
  bookSchema = mongoose.Schema({
    name: { type: String, required:true },
    page: String,
    description: String,
    author: { type: String, required:true },
    img: String,
  });
module.exports = mongoose.model("Books", bookSchema);