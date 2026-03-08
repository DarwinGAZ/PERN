import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Users from "./pages/users";
import Me from "./pages/Me";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import NotFound from "./pages/NotFound";
import { AdminRoute } from "./components/auth/AdminRoute";
import { Header } from "./components/layouts/Header";
import { Footer } from "./components/layouts/Footer";
import { Services } from "./pages/services";
import { ThemeProvider } from "./context/ThemeContext";
import ServiceDetails from "./pages/serviceDetail";
import CreateService from "./pages/CreateService";

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <Header />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/users"
                        element={
                            <AdminRoute>
                                <Users />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="/services/:id"
                        element={
                            <PrivateRoute>
                                <ServiceDetails />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/createService"
                        element={
                            <PrivateRoute>
                                <CreateService />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/me"
                        element={
                            <PrivateRoute>
                                <Me />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/services" element={<Services />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
