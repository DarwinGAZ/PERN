import { createContext, useEffect, useState, type ReactNode } from "react";

type AuthContextType = {
    token: string | null;
    setTokenFunction: (token: string) => void;
    clearTokenFunction: () => void;
    isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const setTokenFunction = (newToken: string) => {
        setToken(newToken);
        localStorage.setItem("token", newToken);
    };

    const clearTokenFunction = () => {
        setToken(null);
        localStorage.removeItem("token");
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider
            value={{
                token,
                setTokenFunction,
                clearTokenFunction,
                isAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
