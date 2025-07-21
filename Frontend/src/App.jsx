import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/login";
import Navbar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./contexts/AuthContext"; 
import './index.css'

function App() {
  return (
    <>
      <AuthProvider>
      <BrowserRouter>
        <Navbar />
        {/* <Routes>
          <Route path="/" element={<Login />} />
        </Routes> */}
      </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
