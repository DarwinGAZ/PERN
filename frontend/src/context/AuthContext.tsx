import { createContext, useEffect, useState, type ReactNode } from "react";
import api from "../services/axios";
import type { RegisterSchema } from "@/schemas/RegisterSchema";

type User = {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "USER";
    createdAt: string;
};

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    register: (data: RegisterSchema) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        api.get("/me")
            .then((res) => {
                setUser(res.data);
            })
            .catch(() => setUser(null))
            .finally(() => setIsLoading(false));
    }, []);

    const register = async (data: RegisterSchema) => {
        await api.post("/register", data);
        const res = await api.get("/me");
        setUser(res.data);
    };

    const login = async (email: string, password: string) => {
        await api.post("/login", { email, password });
        const res = await api.get("/me");
        setUser(res.data);
    };

    const logout = async () => {
        await api.post("/logout");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                register,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
