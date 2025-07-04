// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Cek jika ada info user di localStorage saat aplikasi pertama kali dimuat
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    // Fungsi untuk login
    const login = async (email, password) => {
        const response = await axios.post(`${API_URL}/users/login`, { email, password });
        if (response.data) {
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            setUser(response.data);
        }
        return response.data;
    };

    // Fungsi untuk register
    const register = async (email, password) => {
        const response = await axios.post(`${API_URL}/users/register`, { email, password });
        if (response.data) {
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            setUser(response.data);
        }
        return response.data;
    };

    // Fungsi untuk logout
    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook untuk mempermudah penggunaan context
export const useAuth = () => {
    return useContext(AuthContext);
};