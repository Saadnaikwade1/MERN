# 🌦️ Weather Forecasting App

A modern **Weather Forecasting Web Application** built using **React + Vite**, which fetches real-time weather data using the **WeatherAPI**.  
The app allows users to search for any city and view current weather conditions instantly.

---

## 🚀 Live Demo
🔗 https://whether-api-c5wl.onrender.com/

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite)
- **Styling:** CSS
- **API:** WeatherAPI
- **Deployment:** Render (Static Site)

---

## ✨ Features

- 🔍 Search weather by city name  
- 🌡️ Displays temperature, condition, humidity, wind speed  
- ⚡ Fast performance with Vite  
- 🌐 Deployed on Render  
- 🔒 Secure API calls using HTTPS  
- 📱 Responsive UI  

---

## 📸 Screenshots
![Weather App Screenshot](./Screenshot%202026-01-05%20072042.png)

---

## 🔑 Environment Variables

Create a `.env` file in the project root:

```env
VITE_WEATHER_API_URL=https://api.weatherapi.com/v1
VITE_WEATHER_API_KEY=YOUR_API_KEY
⚠️ Note:
Vite requires environment variables to start with VITE_.

📦 Installation & Setup
1️⃣ Clone the Repository
bash
Copy code
git clone https://github.com/your-username/weather-forecast-app.git
cd weather-forecast-app
2️⃣ Install Dependencies
bash
Copy code
npm install
3️⃣ Run Locally
bash
Copy code
npm run dev
4️⃣ Build for Production
bash
Copy code
npm run build
npm run preview
🌐 API Usage
Endpoint:

h
Copy code
https://api.weatherapi.com/v1/current.json
Example Request:

h
Copy code
https://api.weatherapi.com/v1/current.json?key=API_KEY&q=Pune&aqi=no

```
🧠 Project Structure

src/
│── components/
│── pages/
│── App.jsx
│── main.jsx
│── index.css
🚀 Deployment on Render
Build Command: npm install && npm run build

Publish Directory: dist

Rewrite Rule:

text
Copy code
/*    /index.html    200
❗ Common Issues & Fixes
🔴 Mixed Content Error
✔ Always use HTTPS API URLs
✔ Do not use http:// in production

🔴 Blank Page on Refresh
✔ Add rewrite rule in Render
✔ Set base: "./" in vite.config.js

📌 Future Enhancements
📅 7-day weather forecast

🌍 Current location weather

🌙 Dark mode

📊 Weather charts

👨‍💻 Author
Saad A. Naikwade

MERN Stack Developer

React | Vite | JavaScript | API Integration