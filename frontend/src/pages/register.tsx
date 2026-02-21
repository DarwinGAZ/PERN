import axios from "axios";
import {
    useContext,
    useEffect,
    useState,
    type ChangeEvent,
    type FormEvent,
} from "react";
import api from "../services/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Register() {
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        if (authCtx?.isAuthenticated) {
            navigate("/me");
        }
    }, [authCtx?.isAuthenticated, navigate]);

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage("");
        setLoading(true);

        try {
            const res = await api.post("/register", formData);

            authCtx?.setTokenFunction(res.data.token);
            setSuccessMessage("Conta criada com sucesso!");

            setTimeout(() => {
                navigate("/");
            }, 3000);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setErrorMessage(
                    error.response?.data?.message || "Erro ao registrar",
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
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Criar Conta
                </h2>

                <form
                    onSubmit={handleSubmit}
                    method="POST"
                    className="space-y-4"
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="Nome"
                        value={formData.name}
                        onChange={handleFormEdit}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleFormEdit}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Senha"
                        value={formData.password}
                        onChange={handleFormEdit}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full ${
                            successMessage
                                ? "bg-green-600"
                                : loading
                                  ? "bg-gray-400"
                                  : "bg-blue-600"
                        } text-white py-2 rounded-lg transition font-semibold`}
                    >
                        {loading
                            ? "Registrando..."
                            : successMessage
                              ? successMessage
                              : "Registrar"}
                    </button>
                </form>

                {errorMessage && (
                    <p className="mt-4 text-red-500 text-center text-sm">
                        {errorMessage}
                    </p>
                )}

                <div className="text-center mt-4">
                    <p className="inline ">Tem uma conta?</p>{" "}
                    <span
                        className="text-sky-500 cursor-pointer hover:text-sky-900"
                        onClick={() => {
                            navigate("/login");
                        }}
                    >
                        Entrar
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Register;
