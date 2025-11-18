let express=require("express")
let mongoose=require("mongoose")
const rt=require('./routes/rt.js');

mongoose.connect("mongodb://localhost:27017/hdb").then(()=>{
    console.log("ok");
}).catch(()=>{
    console.log("Error");
})

let app=express()
app.use(express.json())
app.use("/",rt)
app.listen(5000) 