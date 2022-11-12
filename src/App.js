import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserTimeline from "./pages/UserTimeline";
import AdminTimeline from "./pages/AdminTimeline";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { initSampleData } from "./data/LocalDataService";

function App() {
  useEffect(() => initSampleData(), []);

  return (
    <Routes>
      <Route index element={<UserTimeline events={[]} />} />
      <Route exact path="login" element={<Login />} />
      <Route exact path="register" element={<Register />} />
      <Route exact path="events" element={<AdminTimeline />} />

      {/* <Route path="/" element={<AdminTimeline />}>
        <Route exact path="events" element={<AdminTimeline />} />
      </Route> */}
    </Routes>
  );
}

export default App;
