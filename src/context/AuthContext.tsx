import React, { createContext, useContext, useState } from "react";

type User = { id: string; name: string } | null;

type AuthContextType = {
    user: User;
    login: (username: string, password?: string) => Promise<void>;
    logout: () => void;
    isLoginOpen: boolean;
    openLogin: () => void;
    closeLogin: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User>(null);
    const [isLoginOpen, setLoginOpen] = useState(false);

    const login = async (username: string) => {
        // simple mock login
        setUser({ id: username, name: username });
        setLoginOpen(false);
    };
    const logout = () => setUser(null);
    const openLogin = () => setLoginOpen(true);
    const closeLogin = () => setLoginOpen(false);

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoginOpen, openLogin, closeLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};