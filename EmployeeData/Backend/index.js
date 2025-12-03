const express = require("express");
const mongoose = require("mongoose");
const rt = require("./Routes/empRoutes");
const cors = require("cors");

mongoose
  .connect("mongodb://localhost:27017/empdata")
  .then(() => {
    console.log("database connected successfully🚀");
  })
  .catch((err) => {
    console.log(err);
  });

let app = express();
app.use(express.json());
app.use(cors());
app.use("/", rt);

app.listen(5000);
