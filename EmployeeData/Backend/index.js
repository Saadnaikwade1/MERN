const express = require("express");
const mongoose = require("mongoose");
const rt = require("./Routes/empRoutes");
const cors = require("cors");
require("dotenv").config();

const PORT=process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("database connected successfully🚀");
  })
  .catch((err) => {
    console.log(err);
  }); 

let app = express();
app.use(express.json());
app.use(cors({
  origin: "https://employee-management-frontend-2fmu.onrender.com",
  credentials: true
}));

app.use("/", rt);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});