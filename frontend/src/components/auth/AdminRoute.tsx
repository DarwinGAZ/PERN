import { useContext, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../layouts/Loading";

export function AdminRoute({ children }: { children: JSX.Element }) {
    const auth = useContext(AuthContext);

    if (auth?.isLoading) {
        return <Loading />;
    }

    if (!auth?.isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (auth.user?.role !== "ADMIN") {
        return <Navigate to="/" />;
    }

    return children;
}
