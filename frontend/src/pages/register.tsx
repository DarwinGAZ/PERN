import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useState } from "react";

function Register() {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError(null);

        try {
            await axios.post("http://localhost:3333/register", {
                name,
                email,
                password,
            });
            setSuccess(true);
        } catch (err: unknown) {
            let message = "Erro inesperado";

            if (axios.isAxiosError(err)) {
                message = err.response?.data?.error || message;
            }

            setError(message);
            setSuccess(false);
        }
        setTimeout(() => {
            navigate("/");
        }, 2000);
    };

    return (
        <div className="flex min-h-screen items-center justify-center ">
            <div className="flex flex-col h-[70vh] px-6 justify-evenly items-center bg-white border rounded-lg border-gray-500">
                <div className=" p-8 ">
                    <h1 className="mb-6 text-2xl font-semibold text-zinc-800">
                        Bem vindo!
                    </h1>
                    <h1 className="mb-6 text-center text-3xl font-bold text-zinc-800">
                        Vamos Criar Sua Conta
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >
                        <label className="text-md">
                            Nome <br />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Digite seu nome"
                                className="border w-full border-[#282828] p-3.5 mt-1.5 text-zinc-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-sm"
                            />
                        </label>

                        <label className="text-md">
                            Email <br />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Digite seu Email"
                                className="border w-full border-[#282828] mt-1.5 p-3.5 text-zinc-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-sm"
                            />
                        </label>

                        <label htmlFor="" className="text-md">
                            Senha <br />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Digite sua senha"
                                className="border w-full border-[#282828] mt-1.5 p-3.5 text-zinc-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-sm"
                            />
                        </label>

                        {error && (
                            <div className="rounded-md bg-red-100 p-3 text-sm text-red-700">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className={`mt-4 rounded-2xl p-3 text-lg font-semibold text-white transition
                            ${success ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"}`}
                        >
                            {success
                                ? "Conta Criada com sucesso!"
                                : "Criar Conta"}
                        </button>

                        <div className="text-center text-sm text-zinc-600 mt-4">
                            Já tem uma conta?{" "}
                            <Link
                                to="/login"
                                className="font-medium text-blue-600 hover:underline"
                            >
                                Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <div className="hidden w-1/2 items-center justify-center md:flex">
                <img
                    src="/business-process-support-new.gif"
                    alt="Registro"
                    className="max-w-full"
                />
            </div>
        </div>
    );
}

export default Register;
