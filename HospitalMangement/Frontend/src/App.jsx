import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PrivateRoute from "./routes/PrivateRoute";

import AdminDashboard from "./pages/admin/Dashboard";
import DoctorDashboard from "./pages/doctor/Dashboard";
import ReceptionistDashboard from "./pages/receptionist/Dashboard";
import PendingApprovals from "./pages/admin/PendingApprovals";
import CreateDoctor from "./pages/admin/CreateDoctor";
import DoctorProfile from "./pages/doctor/Profile";
import DoctorAppointments from "./pages/doctor/Appointments";
import PatientPrescriptions from "./pages/patient/MyPrescriptions";
import Prescription from "./pages/doctor/Prescriptions";
import BookAppointment from "./pages/patient/BookAppointment";
import Dashboard from "./pages/patient/Dashboard";
import CreatePatientProfile from "./pages/patient/CreatePatientProfile";
import AllUsers from "./pages/admin/AllUsers";
import MyAppointments from "./pages/patient/MyAppointments";
import Home from "./pages/Home/Home";
import ReceptionistAppointments from "./pages/receptionist/ReceptionistAppointments ";
import ReceptionistBookAppointment from "./pages/receptionist/ReceptionistBookAppointment";
import ReceptionistPatients from "./pages/receptionist/ReceptionistPatients";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/patient"
          element={
            <PrivateRoute role="patients">
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/patient/prescriptions"
          element={
            <PrivateRoute role="patients">
              {" "}
              <PatientPrescriptions />
            </PrivateRoute>
          }
        />
        <Route
          path="/patient/profile"
          element={
            <PrivateRoute role="patients">
              {" "}
              <CreatePatientProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/patient/bookappt"
          element={
            <PrivateRoute>
              <BookAppointment />
            </PrivateRoute>
          }
        />
        <Route
          path="/patient/myappt"
          element={
            <PrivateRoute role="patients">
              {" "}
              <MyAppointments />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/pending"
          element={
            <PrivateRoute>
              <PendingApprovals />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/create-doctor"
          element={
            <PrivateRoute>
              <CreateDoctor />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/allusers"
          element={
            <PrivateRoute role="doctor">
              <AllUsers />
            </PrivateRoute>
          }
        />

        <Route
          path="/doctor"
          element={
            <PrivateRoute>
              <DoctorDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/doctor/profile"
          element={
            <PrivateRoute role="doctor">
              <DoctorProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/doctor/appointments"
          element={
            <PrivateRoute role="doctor">
              <DoctorAppointments />
            </PrivateRoute>
          }
        />
        <Route
          path="/doctor/prescriptions/:id"
          element={
            <PrivateRoute role="doctor">
              <Prescription />
            </PrivateRoute>
          }
        />

        <Route
          path="/receptionist"
          element={
            <PrivateRoute role="receptionist">
              <ReceptionistDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/receptionist/appointments"
          element={
            <PrivateRoute role="receptionist">
              <ReceptionistAppointments />
            </PrivateRoute>
          }
        />

        <Route
          path="/receptionist/book-appointment"
          element={
            <PrivateRoute role="receptionist">
              <ReceptionistBookAppointment />
            </PrivateRoute>
          }
        />

        <Route
          path="/receptionist/patients"
          element={
            <PrivateRoute role="receptionist">
              <ReceptionistPatients />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
