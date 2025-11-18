let express=require('express');
let app=express()
let mid1=(req,res,next)=>{
    res.write("mid-1\n")
    next()
} 
let mid2=(req,res,next)=>{
    res.write("mid-2\n")
    next()
}

let mid3=(req,res,next)=>{
    res.write("mid-3\n")
    next()
}
let mid4=(req,res,next)=>{
    res.write("mid-4\n")
    next()
}

app.get("/",mid1,mid3,mid4,(req,res)=>{
    res.end("con-1\n")
})
app.post("/",mid1,mid2,mid4,(req,res)=>{
    res.end("con-2\n")
})

app.get("/home",mid4,mid2,(req,res)=>{
    res.end("con-3")
})
app.listen(5000)