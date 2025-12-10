import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('minimart_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const register = async (name: string, email: string, phone: string, password: string): Promise<boolean> => {
        try {
            // Get existing users from localStorage
            const usersData = localStorage.getItem('minimart_users');
            const users = usersData ? JSON.parse(usersData) : [];

            // Check if email already exists
            if (users.find((u: any) => u.email === email)) {
                return false; // Email already registered
            }

            // Create new user
            const newUser = {
                id: Date.now().toString(),
                name,
                email,
                phone,
                password // In production, this should be hashed!
            };

            // Save to users list
            users.push(newUser);
            localStorage.setItem('minimart_users', JSON.stringify(users));

            // Set as current user (without password)
            const userWithoutPassword = { id: newUser.id, name, email, phone };
            setUser(userWithoutPassword);
            localStorage.setItem('minimart_user', JSON.stringify(userWithoutPassword));

            return true;
        } catch (error) {
            console.error('Registration error:', error);
            return false;
        }
    };

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            // Get users from localStorage
            const usersData = localStorage.getItem('minimart_users');
            const users = usersData ? JSON.parse(usersData) : [];

            // Find user with matching email and password
            const foundUser = users.find((u: any) => u.email === email && u.password === password);

            if (foundUser) {
                // Set as current user (without password)
                const userWithoutPassword = {
                    id: foundUser.id,
                    name: foundUser.name,
                    email: foundUser.email,
                    phone: foundUser.phone
                };
                setUser(userWithoutPassword);
                localStorage.setItem('minimart_user', JSON.stringify(userWithoutPassword));
                return true;
            }

            return false; // Invalid credentials
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('minimart_user');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                register,
                logout,
                isAuthenticated: !!user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
