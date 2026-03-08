// PrivateRoute.tsx
import { useContext, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../layouts/Loading";

export function PrivateRoute({ children }: { children: JSX.Element }) {
    const authCtx = useContext(AuthContext);

    if (authCtx?.isLoading) {
        return <Loading />;
    }

    if (!authCtx?.isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
}
