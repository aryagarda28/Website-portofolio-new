// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "./components/Portfolio.jsx";
import Sertifikat from "./components/Sertifikat.jsx";
import AddPortfolio from "./components/AddPortfolio.jsx";
import AddSertifikat from "./components/AddSertifikat.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";

export default function App() {
  return (
    <div className="App min-h-screen flex flex-col">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/sertifikat" element={<Sertifikat />} />
          <Route path="/tambah-portfolio" element={<AddPortfolio />} />
          <Route path="/tambah-sertifikat" element={<AddSertifikat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
