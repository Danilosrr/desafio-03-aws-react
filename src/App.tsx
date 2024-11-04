import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "./components/search/Search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/portfolio" element={<></>} />
        <Route path="/edit" element={<></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
