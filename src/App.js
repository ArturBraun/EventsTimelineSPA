import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserTimeline from "./pages/UserTimeline";
import AdminTimeline from "./pages/AdminTimeline";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./pages/ResetPassword";
import { initSampleData } from "./data/LocalDataService";
import TableView from "./pages/TableView";

function App() {
  useEffect(() => initSampleData(), []);

  return (
    <Routes>
      <Route index element={<UserTimeline events={[]} />} />
      <Route replace exact path="login" element={<Login />} />
      <Route replace exact path="register" element={<Register />} />
      <Route replace exact path="timeline-view" element={<AdminTimeline />} />
      <Route replace exact path="table-view" element={<TableView />} />
      <Route replace exact path="dashboard" element={<Dashboard />} />
      <Route replace exact path="password-reset" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
