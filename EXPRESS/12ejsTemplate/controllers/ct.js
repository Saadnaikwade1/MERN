let home=(req,res)=>{
    res.render("home")
}


let reg=(req,res)=>{
    res.render("reg")
}

let about=(req,res)=>{
    res.render('about')
}
let add=(req,res)=>{
    console.log(req.body);
    res.render("reg")
}
module.exports={add,home,reg,about}