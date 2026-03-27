import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const api = axios.create({
        baseURL: 'http://localhost:5000/api',
        withCredentials: true
    });

    api.interceptors.request.use(config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const res = await api.get('/auth/me');
                setUser(res.data);
            } catch (error) {
                localStorage.removeItem('token');
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkUser();
    }, []);

    const login = async (identifier, password) => {
        const res = await api.post('/auth/login', { identifier, password });
        localStorage.setItem('token', res.data.token);
        setUser(res.data);
        return res.data;
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (e) {
            console.error(e);
        }
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, api }}>
            {children}
        </AuthContext.Provider>
    );
};
