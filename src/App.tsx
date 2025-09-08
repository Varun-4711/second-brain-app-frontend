import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Signup from "./pages/Signup"; // your signup component
import Login from "./pages/Login"; // your signin component
import Landing from "./pages/Landing"; // your landing page component
import SharedBrainPage from "./pages/SharedBrainPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/shared-brain/:userId" element={<SharedBrainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
