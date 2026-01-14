#### 🏥 Hospital Management System (MERN)

A full-stack Hospital Management System built using React (Frontend) and Node.js + Express + MongoDB (Backend) with role-based access for Admin, Doctor, Patient, and Operator (Receptionist).

###### click here to live demo
- [🚀Hospital_Management](https://hospital-management-le15.onrender.com/)

---

#### This application supports:

-  Patient Management
- Doctor Management
- Appointment Booking
- Operator (Receptionist) Panel
- Role-Based Access Control
---

#### 🛠️ Tech Stack
<p align="center"> 
<img src="https://img.shields.io/badge/Frontend-ReactJS-61DBFB?style=for-the-badge&logo=react&logoColor=black"/> 
<img src="https://img.shields.io/badge/Backend-NodeJS-3C873A?style=for-the-badge&logo=node.js&logoColor=white"/> <img src="https://img.shields.io/badge/API-ExpressJS-000000?style=for-the-badge&logo=express&logoColor=white"/> <img src="https://img.shields.io/badge/Database-MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/> <img src="https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge&logo=jsonwebtokens"/> <img src="https://img.shields.io/badge/HTTP-Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"/> <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge"/> </p>

---

### 👥 User Roles
- admin
- Patient
- Docter
- Receptionist

#### 🚀 Features
###### ✅ Patient Management
- Register and search patients
- Case-insensitive search (name/email)
- View appointment history

###### ✅ Doctor Management

- Doctor profile with specialization

- Available working days

- Consultation fee display

###### ✅ Appointment Booking

- Book by patient or operator

- Doctor availability validation

- Fixed time slots

- Status tracking

###### ✅ Operator Panel

- Front-desk booking

- Patient search & verification

- Appointment history view

###### 🔗 API Endpoints
```
Method	Endpoint	Description
POST	/auth/login	Login user
GET	/patients	Get all patients
GET	/patients/search	Search patient
GET	/doctors	Get doctors
POST	/appointments/book	Book appointment
GET	/appointments/patient/:id	Patient history
```

```bash
📂 Project Structure
Hospital-Management-System/
│
├── frontend/
│   ├── pages/
│   │   ├── admin/
│   │   ├── doctor/
│   │   ├── patient/
│   │   └── receptionist/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── middleware/
```


--- 

#### 🔐 Security

- JWT Authentication

- Role-Based Route Protection

- Secure API access

- Input validation

```bash

📦 Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/Saadnaikwade1/MERN/tree/main/HospitalMangement
cd Hospital-Management-System

Backend Setup
cd backend
npm install
npm run dev


Runs on → http://localhost:5000

Frontend Setup
cd frontend
npm install
npm run dev


Runs on → http://localhost:3000

```


### 🔮 Future Enhancements

- Calendar-based appointment view

- Payment & billing module

- SMS / Email notifications

- Medical records upload
 
- Analytics dashboard

---

##### 💡 Built with ❤️ by Saad A. Naikwade

- 💼 MERN Stack Developer

- 📧 naikwadesaad@gmail.com

- 🌐 GitHub | LinkedIn

---