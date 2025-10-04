import { useState } from "react";
import { addVehicle } from "../api/vehicleApi";

export default function AddVehicleForm() {
  const [form, setForm] = useState({ name: "", capacityKg: "", tyres: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addVehicle({
        name: form.name,
        capacityKg: Number(form.capacityKg),
        tyres: Number(form.tyres),
      });
      setMessage("Vehicle added successfully!");
      setTimeout(() => {
        setMessage("");
      }, 2000);
      setForm({ name: "", capacityKg: "", tyres: "" });
    } catch {
      setMessage("Error adding vehicle");
    }
  };

  return (
    <div className="container">
      <h2>Add Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="capacityKg"
          type="number"
          placeholder="Capacity (KG)"
          value={form.capacityKg}
          onChange={handleChange}
          required
        />
        <input
          name="tyres"
          type="number"
          placeholder="Tyres"
          value={form.tyres}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Vehicle</button>
      </form>
      {message && (
        <p
          className={`message ${
            message.includes("success") ? "success" : "error"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
