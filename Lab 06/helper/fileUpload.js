const express = require("express");
const path = require("path");
const multer = require("multer");
const uuid = require("uuid").v4;
const fs = require("fs");

const dir = "./uploads";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // to select a destination
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    // to get the file name
    const { originalname } = file;
    cb(null, `${uuid()}-${originalname}`);
  },
});
// const upload = multer({dest: 'uploads/'}); this will automatically make the folder if it doesnt exist already
const upload = multer({ storage: storage });

// const app = express();
// app.use(express.static("public"));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "dfw_ost-pic.html"));
// });

app.post("/upload", upload.single("avatar"), (req, res) => {
  console.log(storage.getFilename().originalname);
  return res.json({ status: "OK"});
});

//joining path of directory
const directoryPath = path.join(__dirname, "uploads");
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
  //handling error
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }
  //listing all files using forEach
  files.forEach(function (file) {
    // Do whatever you want to do with the file
    console.log(file);
    app.get(`/file-${file}`, (req, res) => {
      res.sendFile(path.join(__dirname, "uploads", file));
    });
  });
});


app.listen(3000, () => console.log("App is Listening..."));