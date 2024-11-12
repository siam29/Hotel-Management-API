// server.js

const express = require("express");
const path = require("path");
const fs = require("fs");
const hotelRoutes = require("./Hotel/Routes/hotelRoutes"); // Update path to hotelRoutes

const app = express();
const PORT = 8000;
const UPLOAD_DIR = path.join(__dirname, "uploads");

app.use(express.json());

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
}

app.use("/uploads", express.static(UPLOAD_DIR));
app.use("/", hotelRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = server;
