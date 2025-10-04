import { useEffect, useState } from "react";
import { deleteBooking, getBookings } from "../api/bookingApi";

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  const fetchBookings = async () => {
    try {
      const data = await getBookings();
      setBookings(data);
    } catch {
      setMessage("❌ Error fetching bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    try {
      await deleteBooking(id);
      setMessage("✅ Booking cancelled");
      setTimeout(() => {
        setMessage("");
      }, 2000);
      fetchBookings();
    } catch {
      setMessage("❌ Error cancelling booking");
    }
  };

  return (
    <div className="container">
      <h2>All Bookings</h2>
      <div className="grid">
        {bookings.map((b) => (
          <div key={b._id} className="border p-2 my-2">
            <p>
              <b>{b.vehicleId?.name}</b> ({b.fromPincode} → {b.toPincode})
            </p>
            <p>Start: {new Date(b.startTime).toLocaleString()}</p>
            <p>End: {new Date(b.endTime).toLocaleString()}</p>
            <button onClick={() => handleCancel(b._id)}>Cancel Booking</button>
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
      )}{" "}
    </div>
  );
}
