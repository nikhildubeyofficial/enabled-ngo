'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load user from localStorage on mount
        const savedUser = localStorage.getItem('enabled_user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                console.error("Failed to parse saved user", e);
                localStorage.removeItem('enabled_user');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // Simulating API call
        // In reality, this would hit /api/auth/login
        const mockUser = {
            id: 'u1',
            email: email,
            name: email.split('@')[0],
            role: email.includes('admin') ? 'admin' : 'user'
        };

        setUser(mockUser);
        localStorage.setItem('enabled_user', JSON.stringify(mockUser));
        return { success: true };
    };

    const signup = async (data) => {
        // Simulating API call
        const newUser = {
            id: `u-${Date.now()}`,
            email: data.email,
            name: data.name,
            role: 'user'
        };

        setUser(newUser);
        localStorage.setItem('enabled_user', JSON.stringify(newUser));
        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('enabled_user');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
