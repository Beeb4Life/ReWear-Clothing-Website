const express = require("express");
const multer = require("multer");
const app = express();

app.use(express.json());

app.listen(8080, () => {
  console.log("App is running on port 8080");
});

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// Upload route
app.post("/single", upload.single("images"), (req, res) => {
  console.log(req.file); // <-- fixed typo: 'consol' -> 'console'
  res.send("Image uploaded successfully");
});
