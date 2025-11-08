let express=require("express")

let PORT=5000
let app=express()
app.get("/",(req,res)=>{
    res.send("welcome to express world")
})

app.get("/data",(req,res)=>{
    res.send("data sent to you")
})
app.listen(PORT,()=>{
    console.log(`server started successfully! on port http://localhost:${PORT}..🚀`);
})