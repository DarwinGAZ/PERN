import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Users from "./pages/users";
import Me from "./pages/Me";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/users" element={<Users />} />
                <Route path="/" element={<Home />} />
                <Route
                    path="/me"
                    element={
                        <PrivateRoute>
                            <Me />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </AuthProvider>
    );
}

export default App;
