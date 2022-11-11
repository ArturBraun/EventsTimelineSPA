import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserTimeline from "./pages/UserTimeline";
import AdminTimeline from "./pages/AdminTimeline";

function App() {
  return (
    <Routes>
      <Route index element={<UserTimeline events={[]} />} />
      {/* <Route path="/" element={<AdminTimeline />}>
        <Route exact path="events" element={<AdminTimeline />} />
      </Route> */}
    </Routes>
  );
}

export default App;
