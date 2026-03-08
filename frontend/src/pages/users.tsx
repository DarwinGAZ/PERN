import { useEffect, useState } from "react";
import api from "../services/axios";
import { useNavigate } from "react-router-dom";

interface User {
    id: string;
    name: string;
    email: string;
}

function Users() {
    const navigate = useNavigate();

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const getUser = async () => {
            const res = await api.get("/users");
            setUsers(res.data);
        };
        getUser();
    }, []);

    const deleteUser = async (id: string) => {
        try {
            await api.delete(`/deleteUser/${id}`);
            setUsers((prev) => prev.filter((user) => user.id !== id));
        } catch (error) {
            console.error("Error ao deletar usuario", error);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-8 text-center">
                    Lista de Usuários
                </h1>

                {users.length === 0 ? (
                    <div className="text-center text-slate-400 text-lg">
                        Carregando usuários...
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {users.map((user) => (
                            <div
                                key={user.id}
                                className="bg-slate-800/60 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-lg">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-white">
                                            {user.name}
                                        </h3>
                                        <p className="text-slate-400 text-sm">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <button
                                        onClick={() => deleteUser(user.id)}
                                        className="w-full bg-red-600 hover:bg-red-500 text-white font-medium py-2 rounded-xl transition-colors duration-200"
                                    >
                                        Excluir Usuario
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex justify-center">
                <button
                    className="px-4 py-2 mr-4 bg-green-500 rounded-2xl text-white hover:bg-green-600 cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    Ir para Home
                </button>
                <button
                    className="px-4 py-2 bg-green-500 rounded-2xl text-white hover:bg-green-600 cursor-pointer"
                    onClick={() => navigate("/me")}
                >
                    Minha Conta
                </button>
            </div>
        </div>
    );
}

export default Users;
