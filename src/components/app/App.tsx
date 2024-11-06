import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "../search/Search";
import { AuthProvider } from "../../contexts/authContext";
import Portfolio from "../portfolio/portfolio";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/portfolio/:uid" element={<Portfolio />} />
          <Route path="/edit" element={<></>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
