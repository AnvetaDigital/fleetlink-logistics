const API_BASE = "http://localhost:5000/api";

export async function bookVehicle(bookingData) {
  const res = await fetch(`${API_BASE}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getBookings() {
  const res = await fetch(`${API_BASE}/bookings`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function deleteBooking(id) {
  const res = await fetch(`${API_BASE}/bookings/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}