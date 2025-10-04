import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SearchForm from "./components/SearchForm";
import AddVehicleForm from "./components/AddVehicleForm";
import BookingList from "./components/BookingList";

function App() {
  return (
    <BrowserRouter>
      <nav style={{ margin: "10px" }}>
        <Link to="/add" style={{ marginRight: "10px" }}>
          Add Vehicle
        </Link>
        <Link to="/search" style={{ marginRight: "10px" }}>
          Search & Book
        </Link>
        <Link to="/bookings">View Bookings</Link>
      </nav>
      <Routes>
        <Route path="/add" element={<AddVehicleForm />} />
        <Route path="/search" element={<SearchForm />} />
        <Route path="/bookings" element={<BookingList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
