const mongoose = require("mongoose");
let taskScheema = mongoose.Schema({
  _id: String,
  name: String,
  pwd: String,
  dept: String,
  role: {
    type: String,
    default: "emp",
  },
  otp: String,
});

let task = mongoose.model("task", taskScheema);
module.exports = task;
