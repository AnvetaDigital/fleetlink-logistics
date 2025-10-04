import { useState } from "react";
import { bookVehicle } from "../api/bookingApi";
import { searchAvailableVehicles } from "../api/vehicleApi";

export default function SearchForm() {
  const [form, setForm] = useState({
    capacityRequired: "",
    fromPincode: "",
    toPincode: "",
    startTime: "",
  });
  const [vehicles, setVehicles] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await searchAvailableVehicles(form);
      setVehicles(data);
      setMessage(
        data.length ? "Available vehicles found" : "No vehicles available"
      );
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } catch {
      setMessage("❌ Error fetching availability");
    }
  };

  const handleBook = async (vehicleId) => {
    try {
      await bookVehicle({
        vehicleId,
        fromPincode: form.fromPincode,
        toPincode: form.toPincode,
        startTime: form.startTime,
        customerId: "customer123", // hardcoded for now
      });
      setMessage("✅ Booking successful!");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } catch {
      setMessage("❌ Booking failed, vehicle may be unavailable");
    }
  };

  return (
    <div className="container">
      <h2>Search & Book Vehicle</h2>
      <form onSubmit={handleSearch}>
        <input
          name="capacityRequired"
          type="number"
          placeholder="Capacity Required"
          value={form.capacityRequired}
          onChange={handleChange}
          required
        />
        <input
          name="fromPincode"
          placeholder="From Pincode"
          value={form.fromPincode}
          onChange={handleChange}
          required
        />
        <input
          name="toPincode"
          placeholder="To Pincode"
          value={form.toPincode}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="startTime"
          value={form.startTime}
          onChange={handleChange}
          required
        />
        <button type="submit">Search Availability</button>
      </form>

      <div className="grid">
        {vehicles.map((v) => (
          <div
            key={v._id}
            style={{
              border: "1px solid gray",
              margin: "10px",
              padding: "10px",
            }}
          >
            <p>
              <b>{v.name}</b> | Capacity: {v.capacityKg}kg | Tyres: {v.tyres}
            </p>
            <p>Estimated Duration: {v.estimatedRideDurationHours} hrs</p>
            <button onClick={() => handleBook(v._id)}>Book Now</button>
          </div>
        ))}
      </div>

      {message && (
        <p
          className={`message ${
            message.startsWith("✅") ? "success" : "error"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
