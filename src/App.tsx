import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/home" element={<></>} />
        <Route path="/edit" element={<></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
