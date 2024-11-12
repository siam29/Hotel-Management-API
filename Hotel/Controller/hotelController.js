// Hotel/Controller/hotelController.js

const { readData, writeData } = require("../Models/hotelModel");

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

const getAllHotels = (req, res) => {
  const data = readData();
  res.json(data.hotels);
};

const getHotelById = (req, res) => {
  const data = readData();
  const hotel = data.hotels.find((h) => h.id === parseInt(req.params.id));
  if (hotel) {
    res.json(hotel);
  } else {
    res.status(404).send("Hotel not found");
  }
};

const addHotel = (req, res) => {
  const data = readData();
  const newHotel = {
    id: data.hotels.length + 1,
    title: req.body.title,
    slug: slugify(req.body.title),
    ...req.body,
  };
  data.hotels.push(newHotel);
  writeData(data);
  res.status(201).json(newHotel);
};

const updateHotel = (req, res) => {
  const data = readData();
  const hotelIndex = data.hotels.findIndex((h) => h.id === parseInt(req.params.id));
  if (hotelIndex !== -1) {
    data.hotels[hotelIndex] = { ...data.hotels[hotelIndex], ...req.body };
    writeData(data);
    res.json(data.hotels[hotelIndex]);
  } else {
    res.status(404).send("Hotel not found");
  }
};

const uploadImages = (req, res) => {
  const hotelId = parseInt(req.body.hotelId);
  const data = readData();
  const hotel = data.hotels.find((h) => h.id === hotelId);

  if (!hotel) {
    return res.status(404).send("Hotel not found");
  }

  const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);
  hotel.images = [...(hotel.images || []), ...imageUrls];
  writeData(data);

  res.status(200).json({ message: "Images uploaded successfully", images: imageUrls });
};

module.exports = { getAllHotels, getHotelById, addHotel, updateHotel, uploadImages };
