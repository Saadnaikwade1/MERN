let express=require('express');
let mongoose=require('mongoose');
const rt = require('./routes/resRoute');
require("dotenv").config();

mongoose
  mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connection done successfully 🚀");
  })
  .catch(() => {
    console.log("Error in database connection ⚠️");
  });

let app=express()
app.use(express.urlencoded({"extended":true}))

app.set("view engine","ejs")
app.use("/",rt)

app.listen(process.env.PORT || 5000)
