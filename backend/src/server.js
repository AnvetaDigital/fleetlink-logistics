import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import vehicleRoutes from "./routes/vehicleRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/vehicles", vehicleRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("FleetLink - Logistics Vehicle Booking System web_app server");
});

app.listen(PORT, () => {
    console.log(`server is running on PORT : http://localhost:${PORT}`);
});
