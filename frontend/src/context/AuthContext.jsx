"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    getMe,
    login as loginRequest,
    signup as signupRequest,
    logout as logoutRequest,
} from "@/lib/auth";

const AuthContext = createContext(undefined);

export function AuthProvider({
    children,
}) {
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const refreshUser = async () => {
        try {
            const response = await getMe();

            if (response?.success && response?.user) {
                setUser(response.user);
                return response.user;
            }

            setUser(null);
            return null;
        } catch {
            setUser(null);
            return null;
        }
    };

    useEffect(() => {
        const initializeAuth =
            async () => {
                try {
                    await refreshUser();
                } finally {
                    setLoading(false);
                }
            };

        initializeAuth();
    }, []);

    const login = async (data) => {
        const response =
            await loginRequest(data);

        if (response.requiresMfa) {
            return response;
        }

        await refreshUser();

        return response;
    };

    const signup = async (data) => {
        const response = await signupRequest(data);

        return response;
    };

    const logout = async () => {
        try {
            await logoutRequest();
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated: Boolean(user),
                login,
                signup,
                logout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context =
        useContext(
            AuthContext
        );

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}