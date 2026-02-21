// PrivateRoute.tsx
import { useContext, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export function PrivateRoute({ children }: { children: JSX.Element }) {
    const auth = useContext(AuthContext);

    if (!auth?.isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
}
