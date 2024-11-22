import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "../search/Search";
import { AuthProvider } from "../../contexts/authContext";
import { StorageProvider } from "../../contexts/storageContext";
import Portfolio from "../portfolio/portfolio";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <StorageProvider>
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/portfolio/:uid" element={<Portfolio />} />
            <Route path="/edit" element={<></>} />
          </Routes>
        </StorageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
