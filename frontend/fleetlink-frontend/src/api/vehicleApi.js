const API_BASE = "http://localhost:5000/api"; // change if deployed

export async function addVehicle(vehicleData) {
  const res = await fetch(`${API_BASE}/vehicles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vehicleData),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function searchAvailableVehicles(params) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/vehicles/available?${query}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
