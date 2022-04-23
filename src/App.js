import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Register from "./components/Register";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import RoutGuard from "./guards/RoutGuard";
import UserGuard from "./guards/UserGuard";

function App() {
  return (
    <AuthProvider>
      <Routes>

        <Route element={<RoutGuard />}>
          <Route exect path="/" element={<HomePage />} />
          <Route path="/folder/:currentFolderId" element={<HomePage />} />
        </Route>

        <Route element={<UserGuard />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

      </Routes>
    </AuthProvider>
  );
}

export default App;
