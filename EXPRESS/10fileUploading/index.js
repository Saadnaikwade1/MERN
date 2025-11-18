const express = require("express");
const multer = require("multer");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./images");
    },
    filename: function (req, file, cb) {

        const originalName = file.originalname; // e.g. "photo.png"
        const parts = originalName.split(".");  // ["photo", "png"]

        const ext = parts.pop();               // "png"
        const name = parts.join(".");          // "photo"

        const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);

        cb(null, name + "-" + unique + "." + ext);
    }
});

const upload = multer({ storage: storage });

const app = express();
app.use(express.urlencoded({ extended: true }));

// static files
app.use("/myfiles", express.static("./images"));

app.post("/add", upload.single("img"), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    res.send({ msg: "file uploaded" });
});

app.listen(5000, () => {
    console.log("server is running on port 5000 🚀");
});
