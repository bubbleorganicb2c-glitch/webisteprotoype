import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { User, Mail, Lock, X, Eye, EyeOff } from "lucide-react";

export const LoginModal: React.FC = () => {
    const { isLoginOpen, closeLogin, login, signup, user, logout, error } = useAuth();
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    if (!isLoginOpen) return null; // only render when modal is explicitly opened

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (activeTab === 'login') {
                await login(username, password);
            } else {
                if (password !== confirmPassword) {
                    alert("Passwords don't match");
                    return;
                }
                await signup(username, password);
            }
        } catch (err) {
            console.error('Auth error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setShowPassword(false);
        setShowConfirmPassword(false);
    };

    const switchTab = (tab: 'login' | 'signup') => {
        setActiveTab(tab);
        resetForm();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeLogin} />
            <div className="bg-white/95 backdrop-blur-md z-10 rounded-2xl shadow-2xl border border-white/20 max-w-md w-full max-h-[90vh] overflow-hidden animate-fade-in">
                {user ? (
                    <div className="p-8 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <User className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Welcome back!</h3>
                        <p className="text-gray-600 mb-6">Signed in as <span className="font-semibold text-green-700">{user.name}</span></p>
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={logout}
                                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                            >
                                Logout
                            </button>
                            <button
                                onClick={closeLogin}
                                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="relative bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
                            <button
                                onClick={closeLogin}
                                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                                aria-label="Close modal"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <div className="text-center">
                                <h2 className="text-2xl font-bold">Welcome to Bubble Organic</h2>
                                <p className="text-green-100 mt-1">Your journey to healthy living starts here</p>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-gray-200">
                            <button
                                onClick={() => switchTab('login')}
                                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                                    activeTab === 'login'
                                        ? 'text-green-600 border-b-2 border-green-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => switchTab('signup')}
                                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                                    activeTab === 'signup'
                                        ? 'text-green-600 border-b-2 border-green-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                Sign Up
                            </button>
                        </div>

                        {/* Form */}
                        <div className="p-6">
                            {error && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Username
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                            placeholder="Enter your username"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            title={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                {activeTab === 'signup' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                value={confirmPassword}
                                                onChange={e => setConfirmPassword(e.target.value)}
                                                placeholder="Confirm your password"
                                                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                title={showConfirmPassword ? "Hide password" : "Show password"}
                                            >
                                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            {activeTab === 'login' ? 'Signing in...' : 'Creating account...'}
                                        </div>
                                    ) : (
                                        activeTab === 'login' ? 'Sign In' : 'Create Account'
                                    )}
                                </button>
                            </form>

                            {activeTab === 'login' && (
                                <div className="mt-4 text-center">
                                    <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                                        Forgot your password?
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
