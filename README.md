# Transport Facility Management (InfrRd Assignment)

A simple web application for employees to schedule and book pick-up/drop-off transport facility
for the **current day only**.

Built as part of the InfrRd frontend assignment using **Angular** and **plain CSS** (no CSS frameworks).

---

## 🚀 Live Demo

> Hosted on GitHub Pages  
Live Demo: https://rohan-raj-iiitb.github.io/transport-facility-app/

GitHub Repo: https://github.com/rohan-raj-iiitb/transport-facility-app

---

## 🧩 Problem Overview

Employees can:

- Add a ride they are offering for **today**
- Search for available rides near a desired time
- Book a ride if seats are available

Constraints:

- Rides are only for the **current day**
- Only rides within **±60 minutes** of requested time are shown
- Filter rides by **Vehicle Type** (Bike / Car)
- Booking rules:
  - Booking employee cannot be the ride owner
  - Same employee cannot book the same ride twice
  - Vacant seats decrement on each booking

---

## 🛠 Tech Stack

- **Angular** (v17+)
- **TypeScript**
- **HTML / CSS** (no CSS frameworks)
- **Karma + Jasmine** for unit tests
- **LocalStorage** for simple persistence in the browser

---

## 🧱 Features

### 1. Add New Ride

Captures:

- Employee ID (mandatory)
- Vehicle Type (Bike/Car)
- Vehicle No (mandatory)
- Vacant Seats (mandatory)
- Time (mandatory)
- Pick-up Point (mandatory)
- Destination (mandatory)

A new ride is always stored for **today's date**.

### 2. Search & Book Ride

- Enter **your Employee ID**, desired time, and optional vehicle type.
- Shows only rides:
  - For **today**
  - With `vacantSeats > 0`
  - Within **±60 minutes** of requested time
- Booking:
  - Validates rules:
    - Cannot book own ride
    - Cannot double-book same ride
    - No booking if seats are 0
  - Decrements `vacantSeats` on success

---

## 🏗 Architecture

- `src/app/core/models/ride.model.ts`  
  Ride interface and `VehicleType` type.

- `src/app/core/services/ride.service.ts`  
  Core business logic:
  - `addRide(...)`
  - `searchRides(time, vehicleType)`
  - `bookRide(rideId, employeeId)`

- `src/app/features/add-ride`  
  Component to add a new ride.

- `src/app/features/search-book-ride`  
  Component to search and book rides.

- `src/app/app.component.*`  
  Simple shell layout that hosts both feature components.

---

## ▶️ Running the Project Locally

```bash
# install dependencies
npm install

# run dev server
ng serve
# open http://localhost:4200
