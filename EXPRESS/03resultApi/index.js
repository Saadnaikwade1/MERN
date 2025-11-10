let express = require("express");
let mongoose = require("mongoose");
let resultsch = new mongoose.Schema({
  _id: Number,
  name: String,
  gender: String,
  dept: String,
  place: String,
  marks: Number,
});

let rm =  mongoose.model("result", resultsch);
mongoose
  .connect("mongodb://localhost:27017/resultdb")
  .then(() => {
    console.log("Database connection done successfully 🚀");
  })
  .catch(() => {
    console.log("Error in Database connection ⚠️");
  });

let app = express();
app.use(express.json());

app.post("/add", (req, res) => {
  let data = new rm(req.body);
  data
    .save()
    .then(() => {
      res.send("Data Stored🗄️");
    })
    .catch(() => {
      res.send("Error in storing data ⚠️");
    });
});

app.get("/",(req,res)=>{
    rm.find().then((data) => {
      res.json(data)
    }).catch(() => {
      res.send("Error in fetching data ⚠️")
    });
})
app.get("/search/:id",(req,res)=>{
  rm.findById(req.params.id).
    then((data) => {
    res.json(data)
  }).catch(() => {
  res.json({ msg: "Error in searching data" });
});

})

app.listen(5000,()=>{
    console.log("server started on port 5000 🚀");
})

