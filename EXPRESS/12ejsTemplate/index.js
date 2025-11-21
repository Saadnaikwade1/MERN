let express=require('express');
const rt=require('./routes/rt');

let app=express()
app.use(express.urlencoded({"extended":true}))

app.set("view engine","ejs")
app.use("/",rt)
app.listen(5000,()=>{
    console.log("The server is running on PORT 5000 🚀");
})
