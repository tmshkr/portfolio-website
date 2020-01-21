const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

fs.readdir(path.join(__dirname, "images/source"), function(err, files) {
  if (err) {
    return console.error(err);
  }

  files.forEach(function(file) {
    if (/.jpg$/.test(file)) {
      sharp(path.join(__dirname, "images/source", file))
        .resize({ width: 1200 })
        .toFile(path.join(__dirname, "images/resized", file))
        .then(info => {
          const oldPath = path.join(__dirname, "images/resized", file);
          const newPath = oldPath.replace(
            ".jpg",
            `_${info.width}x${info.height}.jpg`
          );
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
});
