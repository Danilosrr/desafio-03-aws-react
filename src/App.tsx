import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "./components/search/Search";
import { AuthProvider } from "./contexts/authContext";
import Portfolio from "./components/portfolio/portfolio";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/portfolio/:name" element={<Portfolio/>} />
          <Route path="/edit" element={<></>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
