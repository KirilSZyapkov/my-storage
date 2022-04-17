import Register from "./components/Register";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Register />
    </AuthProvider>
  );
}

export default App;
