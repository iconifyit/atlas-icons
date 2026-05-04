import React from "react";
import { Navigate } from "react-router-dom";
import auth from "../../services/authService";

const ProtectedRoute = ({ children }) => {
    if (!auth.getCurrentUser()) {
        return <Navigate to='/login' />
    }

    return <> {children}</>
};

export default ProtectedRoute;