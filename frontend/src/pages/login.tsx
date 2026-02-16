import axios from "axios";
import { useState, type ChangeEvent, type FormEvent } from "react";
import api from "../services/axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage("");
        setLoading(true);

        try {
            const res = await api.post("/login", formData);

            localStorage.setItem("token", res.data.token);

            navigate("/home");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setErrorMessage(
                    error.response?.data?.message || "Erro ao fazer login",
                );
            } else {
                setErrorMessage("Erro inesperado");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleFormEdit = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleFormEdit}
                        className="w-full px-4 py-2 border rounded-lg"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Senha"
                        value={formData.password}
                        onChange={handleFormEdit}
                        className="w-full px-4 py-2 border rounded-lg"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg"
                    >
                        {loading ? "Entrando..." : "Entrar"}
                    </button>
                </form>

                {errorMessage && (
                    <p className="mt-4 text-red-500 text-center text-sm">
                        {errorMessage}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Login;
