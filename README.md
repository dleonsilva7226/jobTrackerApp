# 📌 Job Tracker App

A fullstack job application tracker where users can create, view, update, and delete job applications.

- **Frontend**: React + Vite + TypeScript
- **Backend**: Express + TypeScript
- **Status**: 🚧 In Development

---

## ⚙️ Setup Instructions

### 🔧 Backend Setup (Express + TypeScript)

1. Navigate to the backend folder:
   cd server

2. Install dependencies:
   npm install

3. Start the development server:
   npm run dev

4. The server runs by default at:
   http://localhost:8000

#### API Routes

| Method | Endpoint       | Description             |
|--------|----------------|-------------------------|
| POST   | /jobs          | Create a new job        |
| GET    | /jobs          | Get all jobs            |
| PUT    | /jobs/:id      | Update a job by ID      |
| DELETE | /jobs/:id      | Delete a job by ID      |

---

### 💻 Frontend Setup (React + Vite + TSX)

1. Navigate to the frontend folder:
   cd client

2. Install dependencies:
   npm install

3. Start the development server:
   npm run dev

4. By default, the frontend runs at:
   http://localhost:5173

Note: Make sure the backend is running before interacting with the frontend.

---

## 🔐 Environment Variables

Create a .env file in /server (if needed):

PORT=8000

You can also configure a .env file for Vite in /client:

VITE_API_URL=http://localhost:8000

---

## ✅ Features

- Create new job entries
- View a list of all added jobs
- Update job details
- Delete a job entry
- Frontend and backend are fully typed with TypeScript
- Basic REST API for job data

---

## 📄 License

This project is licensed under the MIT License.
