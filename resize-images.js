const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

fs.readdirSync(path.join(__dirname, "images/source")).forEach(file => {
  if (/.jpg$/.test(file)) {
    sharp(path.join(__dirname, "images/source", file))
      .resize({ width: 1800, height: 1200 })
      .toFile(path.join(__dirname, "images/resized", file))
      .then(info => {
        const oldPath = path.join(__dirname, "images/resized", file);
        const newPath = oldPath.replace(".jpg", `-${info.width}w.jpg`);
        fs.renameSync(oldPath, newPath);
        console.log(file, "resized");
      })
      .catch(err => {
        if (err) {
          return console.error(err);
        }
      });
  }
});
