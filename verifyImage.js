const fs = require("fs");
const path = require("path");

// Path to your image
const imagePath = path.join(__dirname, "assets/images/bg.png");

// Check if the file exists
fs.access(imagePath, fs.constants.F_OK, (err) => {
  if (err) {
    console.log("Image does not exist:", imagePath);
  } else {
    console.log("Image exists:", imagePath);
    const stats = fs.statSync(imagePath);
    console.log("File size (bytes):", stats.size);
  }
});
