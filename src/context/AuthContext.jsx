import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));

    // Heartbeat to check session expiry every second
    useEffect(() => {
        const timer = setInterval(() => {
            const expiry = localStorage.getItem('session_expiry');
            if (expiry && Date.now() > parseInt(expiry)) {
                logout();
            }
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const login = (email, password) => {
        const registered = JSON.parse(localStorage.getItem('registered_user'));
        if (registered && registered.email === email && registered.password === password) {
            const expiry = Date.now() + 5 * 60 * 1000; // 5 Minutes
            localStorage.setItem('user', JSON.stringify(registered));
            localStorage.setItem('session_expiry', expiry.toString());
            setUser(registered);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('session_expiry');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);