let express = require("express");
let app = express();

app.use("/", (req, res, next) => {
    res.write("mid-1\n");
    next();
});

app.get("/", (req, res, next) => {
    res.write("mid-2\n");
    next();
});

app.get("/home", (req, res, next) => {
    res.write("mid-3\n");
    next();
});

app.get("/home", (req, res, next) => {
    res.write("mid-4\n");
    res.end(); 
});

app.post("/", (req, res) => {
    res.end("mid-8 POST");
});

app.get("/", (req, res) => {
    res.end("mid-8 GET");
});

app.listen(5000, () => {
    console.log("server is running on port no 5000 🚀");
});
