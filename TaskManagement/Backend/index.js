const express = require('express');
const rt = require('./routes/empRoute');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB();   

// Routes


app.use("/", rt);
// Server start
app.listen(PORT, () => {
  console.log(`Server running `);
});
