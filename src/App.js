import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
