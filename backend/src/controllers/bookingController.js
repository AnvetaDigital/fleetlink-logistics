import Booking from "../models/Booking.js";
import Vehicle from "../models/Vehicle.js";

const calculateRideDuration = (fromPincode, toPincode) => {
  const from = parseInt(fromPincode, 10);
  const to = parseInt(toPincode, 10);

  if (isNaN(from) || isNaN(to)) {
    throw new Error("Invalid pincodes, must be numeric values");
  }

  return Math.abs(to - from) % 24 || 1;
};

//create booking api
export const createBooking = async (req, res) => {
  try {
    const { vehicleId, fromPincode, toPincode, startTime, customerId } =
      req.body;

    if (!vehicleId || !fromPincode || !toPincode || !startTime || !customerId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    let rideDuration;
    try {
      rideDuration = calculateRideDuration(fromPincode, toPincode);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }

    const start = new Date(startTime);
    if (isNaN(start.getTime())) {
      return res.status(400).json({
        message:
          "Invalid startTime format. Use ISO format e.g. 2025-10-03T10:00:00Z",
      });
    }

    const end = new Date(start.getTime() + rideDuration * 60 * 60 * 1000);

    const overlap = await Booking.findOne({
      vehicleId,
      $or: [{ startTime: { $lt: end }, endTime: { $gt: start } }],
    });

    if (overlap) {
      return res
        .status(409)
        .json({ message: "Vehicle already booked in this time slot" });
    }

    const booking = await Booking.create({
      vehicleId,
      fromPincode,
      toPincode,
      startTime: start,
      endTime: end,
      customerId,
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//fetch all bookings api
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate(
      "vehicleId",
      "name capacityKg tyres"
    );
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//delete booking api
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
