# FleetLink - Logistics Vehicle Booking System

FleetLink is a full-stack application to manage and book logistics vehicles for B2B clients.  
It provides APIs for vehicle management, availability checks, and bookings, along with a simple React frontend for administrators/users.

---

## 🚀 Features
- Add new vehicles to the fleet.
- Search available vehicles by:
  - Capacity required
  - Route (from/to pincodes)
  - Desired start time
- View available vehicles with estimated ride duration.
- Book a vehicle (with conflict validation).
- Backend unit tests (Jest).

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Frontend:** ReactJS
- **Testing:** Jest, Supertest
- **Others:** Docker

---

## ⚡ Installation & Setup

### Backend
```bash
cd backend
npm install
npm run dev
```

Create `.env` file in `backend/`:
```
MONGODB_URI=mongodb://127.0.0.1:27017/fleetlink
PORT=5000
```

### Frontend
```bash
cd frontend
npm install
npm start
```

---

## 👨‍💻 Author
**Anveta Nangare**  

