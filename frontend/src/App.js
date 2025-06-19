import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Detection from "./components/Detection";
import Dataset from "./components/Dataset";

export default function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Navigate to="/detection" />} />
            <Route path="/detection" element={<Detection />} />
            <Route path="/dataset" element={<Dataset />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
