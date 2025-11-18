const express = require('express');
const router = require('./routes/userroute');
const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/userdbLogin").
then(() => {
    console.log("Successfully connected database🚀");    
}).catch((err) => {
    console.log("Error in connection of database");
});
let app=express()
app.listen(5000)
app.use(express.json())
app.use("/",router)