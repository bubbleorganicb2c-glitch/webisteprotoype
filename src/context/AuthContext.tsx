import React, { createContext, useContext, useState } from "react";

type User = { id: string; name: string } | null;

type AuthContextType = {
    user: User;
    login: (username: string, password: string) => Promise<void>;
    signup: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isLoginOpen: boolean;
    openLogin: () => void;
    closeLogin: () => void;
    error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User>(null);
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (username: string, password: string) => {
        setError(null);
        // simple mock login
        if (username && password) {
            setUser({ id: username, name: username });
            setLoginOpen(false);
        } else {
            setError("Please enter both username and password");
        }
    };

    const signup = async (username: string, password: string) => {
        setError(null);
        // simple mock signup
        if (username && password) {
            setUser({ id: username, name: username });
            setLoginOpen(false);
        } else {
            setError("Please enter both username and password");
        }
    };

    const logout = () => setUser(null);
    const openLogin = () => setLoginOpen(true);
    const closeLogin = () => setLoginOpen(false);

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, isLoginOpen, openLogin, closeLogin, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};