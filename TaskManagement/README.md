# 📝 Task Manager System

A role-based **Task Management Application** where **Admin assigns tasks** and **Employees can accept or reject tasks**.  
The system includes **secure authentication (Login/Logout)** and **task status tracking**.

---

## 🚀 Features

### 🔐 Authentication
- User Registration (Admin / Employee)
- Secure Login & Logout
- JWT-based Authentication
- Role-based Access Control

### 👨‍💼 Admin Module
- Admin Dashboard
- Create & Assign Tasks to Employees
- View all tasks and their status
- Track Accepted / Rejected / Pending Tasks

### 👨‍💻 Employee Module
- Employee Dashboard
- View Assigned Tasks
- Accept or Reject Tasks
- Update Task Status

### 📊 Task Management
- Task Title, Description & Deadline
- Task Status:
  - Pending
  - Accepted
  - Rejected
- Real-time status update

---

## 🛠️ Tech Stack

### Frontend
- React.js
- HTML, CSS, JavaScript
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcrypt.js

### Tools
- Postman (API Testing)
- Git & GitHub

---

## 📂 Project Structure

TaskManager/
│
├── backend/
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── index.js
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ └── App.js
│ └──api.js  
│
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Saadnaikwade1/MERN/tree/main/TaskManagement
cd TaskManagement
2️⃣ Backend Setup
bash
Copy code
cd backend
npm install
Create .env file:

env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Run Backend:

bash
Copy code
npm run dev
3️⃣ Frontend Setup
bash
Copy code
cd frontend
npm install
npm start

```
---
🔑 User Roles
Role	Permissions
Admin	Assign tasks, view all task status
Employee	Accept or reject assigned tasks

📌 Task Workflow
Admin logs in

Admin creates and assigns a task to an employee

Employee logs in

Employee accepts or rejects the task

Admin can track task status

---
📸 Screenshots (Optional)



👤 Author
Saad A. Naikwade
MERN Stack Developer
📍 India

LinkedIn: https://www.linkedin.com/in/saad-naikwade/

GitHub:https://github.com/Saadnaikwade1

