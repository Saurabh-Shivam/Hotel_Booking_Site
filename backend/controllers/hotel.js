import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

// CREATE HOTEL
export const createHotel = async (req, res, next) => {
  // this will store the document(hotel) information we have entered
  const newHotel = new Hotel(req.body);

  try {
    // data will be stored in the database
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
};

// UPDATE HOTEL
export const updateHotel = async (req, res, next) => {
  // finding the document(hotel) with the help of id and updating it
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      // bcz findByIdAndUpdate returns the previous document not the updated one so to prevent that we uhave writted this
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

// DELETE HOTEL
export const deleteHotel = async (req, res, next) => {
  // finding the document(hotel) with the help of id and deleting it
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};

// GET HOTEL
export const getHotel = async (req, res, next) => {
  // finding the document(hotel) with the help of id
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

// GET ALL HOTELS
export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

// COUNT ROOMS ACCORDING TO CITY
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

// COUNT ROOMS ACCORDING TO TYPE
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

// GETTING HOTEL ROOMS
export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    // bcz we have multiple rooms so here we are using Promise.all()
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
