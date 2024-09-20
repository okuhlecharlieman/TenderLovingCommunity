import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Contact from "./contact";
import Home from "./home";
import AddTender from "./addTender";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/addtender" element={<AddTender />} />

      </Routes>
    </Router>
  );
};

export default AppRouter;