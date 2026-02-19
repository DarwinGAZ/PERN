import { useEffect, useState } from "react";
import api from "../services/axios";

function Me() {
    type User = {
        id: number;
        name: string;
        email: string;
        createdAt: string;
    };

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await api.get("/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUser(res.data.user);
            } catch (error) {
                console.error("Erro ao buscar usuário", error);
            }
        };

        fetchUser();
    }, []);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
                <p className="animate-pulse text-lg">Carregando perfil...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 text-center">
                {/* Avatar */}
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
                    {user.name.charAt(0).toUpperCase()}
                </div>

                {/* Nome */}
                <h2 className="text-2xl font-semibold text-slate-800">
                    {user.name}
                </h2>

                {/* Email */}
                <p className="text-slate-500 mb-6">{user.email}</p>

                {/* Info box */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-100 rounded-lg p-3">
                        <span className="text-xs text-slate-500">ID</span>
                        <p className="font-medium text-slate-800">{user.id}</p>
                    </div>

                    <div className="bg-slate-100 rounded-lg p-3">
                        <span className="text-xs text-slate-500">
                            Criado em
                        </span>
                        <p className="font-medium text-slate-800">
                            {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                {/* Botão */}
                <button
                    onClick={() => {
                        window.location.href = "/";
                    }}
                    className="mt-6 w-full bg-green-500 hover:bg-green-600 transition text-white py-2 rounded-lg font-medium"
                >
                    Voltar Pra Home
                </button>
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/";
                    }}
                    className="mt-2 w-full bg-red-500 hover:bg-red-600 transition text-white py-2 rounded-lg font-medium"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Me;
