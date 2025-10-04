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

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express, MongoDB, Mongoose, CORS, dotenv 
- **Frontend:** ReactJS, React Router, CSS, Fetch API

## Project Structure

```plaintext
fleetlink-logistics/
├── backend/               
│   └── src/
│       ├── config/         # DB connection
│       ├── models/         # Mongoose schemas
│       ├── controllers/    # Business logic
│       ├── routes/         # API routes
│       └── server.js
│
└── frontend/
 └── fleetlink-logistics            # React frontend
    └── src/
        ├── components/ 
        |── api/
        ├── App.jsx
        └── main.jsx
        └── index.css

---

## Setup Instructions

### 1️⃣ Clone the repo
```bash
git clone https://github.com/AnvetaDigital/fleetlink-logistics.git
cd fleetlink-logistics

2️⃣ Backend Setup
cd backend
npm install

Create .env file in /backend with the following:
# Server Port
PORT=5000

# MongoDB connection string (replace with your own cluster or local URI)
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/fleetlink-logistics

Run backend:
npm start

3️⃣ Frontend Setup
cd ../frontend
npm install

Run frontend:
npm run dev
---
