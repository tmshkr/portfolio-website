const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

fs.readdirSync(path.join(__dirname, "images/projects")).forEach(file => {
  if (/.png$/.test(file)) {
    sharp(path.join(__dirname, "images/projects", file))
      .resize({ width: 200, height: 200 })
      .toFile(path.join(__dirname, "images/resized", file))
      .then(info => {
        const oldPath = path.join(__dirname, "images/resized", file);
        const newPath = oldPath.replace(".png", `-${info.width}w.png`);
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
