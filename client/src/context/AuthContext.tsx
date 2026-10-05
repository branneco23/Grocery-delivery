import { createContext, useContext, useState } from "react";
import type { User } from "../types";
import { useNavigate } from "react-router-dom";
import api from "../config/api";
import { toast } from "react-hot-toast/headless";

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(localStorage.getItem("auth_token"));
    
    // Inicializamos el usuario de forma segura desde el localStorage
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem("auth_user");
        try {
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (e) {
            return null;
        }
    });
    
    const [loading, setLoading] = useState(false);

    const login = async (email: string, password: string) => {
        try {
            const { data } = await api.post('/auth/login', { email, password });
            const newToken = data.token;
            const loggedUser = data.user;

            setToken(newToken);
            setUser(loggedUser);
            localStorage.setItem("auth_token", newToken);
            localStorage.setItem("auth_user", JSON.stringify(loggedUser));

            toast.success("Inicio de sesión exitoso");
            navigate("/");
        } catch (error: any) {
            toast.error(error.response?.data?.message || error?.message || "Error al iniciar sesión");
        }
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            const { data } = await api.post('/auth/register', { name, email, password });
            const newToken = data.token;
            const registeredUser = data.user;

            setToken(newToken);
            setUser(registeredUser);
            localStorage.setItem("auth_token", newToken);
            localStorage.setItem("auth_user", JSON.stringify(registeredUser));

            toast.success("Registro exitoso");
            navigate("/");
        } catch (error: any) {
            toast.error(error.response?.data?.message || error?.message || "Error al registrarse");
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
        navigate("/login");
    };

    const updateUser = (userData: Partial<User>) => {
        setUser((prevUser) => {
            if (!prevUser) return null;
            const updated = { ...prevUser, ...userData };
            localStorage.setItem("auth_user", JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <AuthContext.Provider value={{
            user, token, loading, login, register, logout, updateUser
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe utilizarse dentro de un AuthProvider");
    return context;
}