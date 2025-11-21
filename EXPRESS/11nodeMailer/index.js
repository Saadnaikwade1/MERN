const express = require('express');
const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "naikwadesaad@gmail.com",
    pass: "qnsguwrybmkfdsrq",
  },
});

let app=express()
// // Wrap in an async IIFE so we can use await.
app.get("/send",async (req,res) => {
  const info = await transporter.sendMail({
    from: '"Saad" <naikwadesaad@gmail.com>',
    to: "v24hfs7s1@gmail.com",
    subject: "Hello ✔",
    text: "Hello world?",// plain‑text body
  });

  res.send({"msg":info})
});

app.listen(5000)