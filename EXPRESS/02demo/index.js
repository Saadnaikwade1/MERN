let express=require("express")
let app=express()
app.use(express.json())

let PORT=5000
app.get("/",(req,res)=>{
    res.send("Hello from server🙏")
})

app.get("/login",(req,res)=>{
    res.send("login req recieved")
})
app.get("/about",(req,res)=>{
    res.send("i am a simple app not et fully implemented")
})
app.post("/add",(req,res)=>{
    console.log(req.body);
    res.send("data recieved")
    
app.get("/search/:email",(req,res)=>{
    console.log(req.params.email);
    res.send("check email")
})

})
app.listen(PORT,()=>{
    console.log(`Server started successfully on http://localhost:${PORT}🚀`);
})