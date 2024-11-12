// routes/hotelRoutes.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getAllHotels,
  getHotelById,
  addHotel,
  updateHotel,
  uploadImages,
} = require("../controller/hotelController"); // Ensure "controller" is lowercase and matches your actual directory

const router = express.Router();
const UPLOAD_DIR = path.join(__dirname, "../uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

router.get("/hotels", getAllHotels);
router.get("/hotels/:id", getHotelById);
router.post("/hotels", addHotel);
router.put("/hotels/:id", updateHotel);
router.post("/images", upload.array("images"), uploadImages);

module.exports = router;
