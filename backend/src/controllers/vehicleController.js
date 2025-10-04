import Vehicle from "../models/Vehicle.js";
import Booking from "../models/Booking.js";

// ✅ Helper function
const calculateRideDuration = (fromPincode, toPincode) => {
  const from = parseInt(fromPincode, 10);
  const to = parseInt(toPincode, 10);

  if (isNaN(from) || isNaN(to)) {
    throw new Error("Invalid pincodes, must be numeric values");
  }

  return Math.abs(to - from) % 24 || 1; // ensure at least 1 hr
};

// ✅ POST /api/vehicles
export const addVehicle = async (req, res) => {
  try {
    const { name, capacityKg, tyres } = req.body;

    if (!name || !capacityKg || !tyres) {
      return res
        .status(400)
        .json({ message: "All fields (name, capacityKg, tyres) are required" });
    }

    const vehicle = await Vehicle.create({ name, capacityKg, tyres });
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET /api/vehicles/available
export const getAvailableVehicles = async (req, res) => {
  try {
    const { capacityRequired, fromPincode, toPincode, startTime } = req.query;

    if (!capacityRequired || !fromPincode || !toPincode || !startTime) {
      return res.status(400).json({ message: "Missing query parameters" });
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

    // Step 1: Get vehicles with enough capacity
    const vehicles = await Vehicle.find({
      capacityKg: { $gte: capacityRequired },
    });

    // Step 2: Filter out booked vehicles
    const available = [];
    for (const v of vehicles) {
      const overlap = await Booking.findOne({
        vehicleId: v._id,
        $or: [
          { startTime: { $lt: end }, endTime: { $gt: start } }, // overlap condition
        ],
      });

      if (!overlap) {
        available.push({
          ...v.toObject(),
          estimatedRideDurationHours: rideDuration,
        });
      }
    }

    res.status(200).json(available);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
