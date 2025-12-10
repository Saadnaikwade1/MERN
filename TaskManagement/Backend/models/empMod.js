const mongoose = require("mongoose");
let empScheema = mongoose.Schema({
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

let emp = mongoose.model("emp", empScheema);
module.exports = emp;
