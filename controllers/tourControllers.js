const mongoose = require("mongoose");
const Tour = require("../models/tourModel");

// GET /tours
const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find().sort({ createdAt: -1 }); // Sort by creation date in descending order
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: "error.message" });
  }
};

// POST /tours
const createTour = async (req, res) => {
  try {
    const { name, info, image, price, duration, rating, season, specialOffer } =
      req.body;
    const newTour = await Tour.create({
      name,
      info,
      image,
      price,
      duration,
      rating,
      season,
      specialOffer,
    });
    res.status(201).json(newTour); // 201 Created
  } catch (error) {
    res
      .status(400)
      .json({
        message:
          "Invalid tour data. Ensure all fields are provided, including 'season' and 'specialOffer'.",
      });
  }
};

// GET /tours/:tourId
const getTourById = async (req, res) => {
  try {
    const {tourId} = req.params;
    if (!mongoose.Types.ObjectId.isValid(tourId)) {
      return res.status(400).json({ message: "Invalid tour ID" });
    }
    const tour = await Tour.findById(tourId);
    if (!tour) {
      res.status(404).json({ message: "Tour not found" });
    }
    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /tours/:tourId
const updateTour = async (req, res) => {
  try {
    const { tourId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(tourId)) {
      return res.status(400).json({ message: "Invalid tour ID" });
    }
    const updatedTour = await Tour.findByIdAndUpdate(tourId, req.body, {
      new: true,
      runValidators: true,
    }); // Spread the req.body object

    if (!updatedTour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    res.json(updatedTour);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /tours/:tourId
const deleteTour = async (req, res) => {
  try {
    const { tourId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(tourId)) {
      return res.status(400).json({ message: "Invalid tour ID format" });
    }

    const deletedTour = await Tour.findByIdAndDelete(tourId);

    if (!deletedTour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};
