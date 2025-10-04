import express from "express";
import { cancelBooking, createBooking, getBookings } from "../controllers/bookingController.js";

const router = express.Router();
router.post("/", createBooking);
router.get("/", getBookings);
router.delete("/:id", cancelBooking);

export default router;
