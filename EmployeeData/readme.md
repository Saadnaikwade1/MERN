## 📘 Employee Management System (MERN CRUD)

A simple Employee Management System built using React (frontend) and Node.js + Express + MongoDB (backend).
![Coding Animation](https://i.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif)

##### This app supports:

✔ Add Employee
✔ Display Employees
✔ Edit Employee
✔ Delete Employee

---

## 🛠️ Tech Stack

<p align="left"> <!-- React --> <img src="https://img.shields.io/badge/Frontend-ReactJS-61DBFB?style=for-the-badge&logo=react&logoColor=black"/> <!-- Node --> <img src="https://img.shields.io/badge/Backend-NodeJS-3C873A?style=for-the-badge&logo=node.js&logoColor=white"/> <!-- Express --> <img src="https://img.shields.io/badge/API-ExpressJS-000000?style=for-the-badge&logo=express&logoColor=white"/> <!-- MongoDB --> <img src="https://img.shields.io/badge/Database-MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/> <!-- Axios --> <img src="https://img.shields.io/badge/HTTP-Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"/> <!-- License --> <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge"/> <!-- Status --> <img src="https://img.shields.io/badge/Status-Complete-brightgreen?style=for-the-badge"/> </p>

---

### 📸 Project Preview

![App Screenshot](emp.png)

---

### 🚀 Features

###### ✅ Add Employee

Users can enter:

- Employee ID

- Name

- Email

- Phone Number

- Gender

- Salary

- Department

###### ✅ View All Employees

- Clean, modern UI table display

- Edit and Delete buttons

- Auto refresh after update/delete

###### ✅ Edit Employee

- Pre-filled form with existing data

- Update employee information in database

###### ✅ Delete Employee

- Safe confirmation popup

- Deletes using Employee ID

| Method | Endpoint  | Description        |
| ------ | --------- | ------------------ |
| GET    | /disp     | Get all employees  |
| POST   | /add      | Add new employee   |
| GET    | /edit/:id | Get employee by id |
| PUT    | /upd/:id  | Update employee    |
| DELETE | /del/:id  | Delete employee    |

---

```bash
📦 Installation & Setup
1️⃣ Clone the Repository
git clone --no-checkout https://github.com/Saadnaikwade1/MERN.git
cd MERN
git sparse-checkout init --cone
git sparse-checkout set EmployeeData


2️⃣ Setup Backend
cd Backend
npm install

Start server:
node index.js

Runs on → http://localhost:5000

3️⃣ Setup Frontend
cd Frontend
npm install
npm run dev


Runs on → http://localhost:3000

```

---

💡 Built with ❤️ by [Saad A. Naikwade](https://github.com/Saadnaikwade1)

- 💼 MERN Stack Developer
- 📧 naikwadesaad@gmail.com
- 🌐 LinkedIn | GitHub
