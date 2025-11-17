const express = require("express");
const mongoose = require("mongoose");

let bookSchema = new mongoose.Schema({
  _id: Number,
  title: String,
  author: String,
  price: Number,
  rating: Number,
  pages: Number,
  gener: String,
  publishedYear: Number,
});

let book = mongoose.model("book", bookSchema);

mongoose
  .connect("mongodb://localhost:27017/booklib")
  .then(() => {
    console.log("Database connection done successfully 🚀");
  })
  .catch(() => {
    console.log("Error in database connection ⚠️");
  });

let app = express();

app.use(express.json());

app.post("/add", (req, res) => {
  let data = new book(req.body);
  data
    .save()
    .then((data) => {
      res.send({ msg: "data stored" });
    })
    .catch(() => {
      res.send({ msg: "ERROR in storing data" });
    });
});

app.get("/", (req, res) => {
  book
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ msg: "Error in getting data" });
    });
});

app.get("/search/:id", (req, res) => {
  book
    .find({ _id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.json({ msg: "Error in fetching data" });
    });
});

app.get("/search/:fn/:val", (req, res) => {
  book
    .find({ [req.params.fn]: req.params.val })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ msg: "Error in getting data" });
    });
});

app.get("/getdata/:val", (req, res) => {
  book
    .find({
      $or: [
        { author: req.params.val },
        { title: req.params.val },
        { price: req.params.val },
        { pages: req.params.val },
        { publishedYear: req.params.val },
      ],
    })
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.json({ msg: "Error in fetching data" });
    });
});

app.listen(5000);
