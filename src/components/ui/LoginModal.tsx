import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export const LoginModal: React.FC = () => {
    const { isLoginOpen, closeLogin, login, user, logout } = useAuth();
    const [username, setUsername] = useState("");

    if (!isLoginOpen && !user) return null; // don't render unless open or logged in (to allow logout)
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={closeLogin} />
            <div className="bg-white p-6 z-10 rounded shadow">
                {user ? (
                    <div>
                        <div>Signed in as {user.name}</div>
                        <button onClick={logout}>Logout</button>
                        <button onClick={closeLogin}>Close</button>
                    </div>
                ) : (
                    <form onSubmit={(e) => { e.preventDefault(); login(username); }}>
                        <h3 className="font-bold mb-2">Login</h3>
                        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="username" className="border p-1 mb-2 w-full" />
                        <div className="flex gap-2">
                            <button type="submit" className="btn-primary">Login</button>
                            <button type="button" onClick={closeLogin}>Cancel</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};