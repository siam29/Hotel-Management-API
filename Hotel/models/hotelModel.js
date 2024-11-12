// Hotel/Models/hotelModel.js

const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "../../Data/hotel-id.json"); // Adjusted path to data file

const readData = () => {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      writeData({ hotels: [] });
    }
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading data:", error);
    return { hotels: [] };
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing data:", error);
  }
};

module.exports = { readData, writeData };
