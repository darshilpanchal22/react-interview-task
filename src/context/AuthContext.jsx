import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const expiry = localStorage.getItem("session_expiry");

        if (storedUser && expiry) {
            const remaining = parseInt(expiry) - Date.now();

            if (remaining > 0) {
                setUser(JSON.parse(storedUser));
                setTimeLeft(remaining);
            } else {
                logout();
            }
        }
    }, []);

    useEffect(() => {
        if (!user) return;

        const interval = setInterval(() => {
            const expiry = localStorage.getItem("session_expiry");

            if (!expiry) {
                logout();
                return;
            }

            const remaining = parseInt(expiry) - Date.now();

            if (remaining <= 0) {
                logout();
                clearInterval(interval);
            } else {
                setTimeLeft(remaining);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [user]);

    const login = (email, password) => {
        const registered = JSON.parse(localStorage.getItem("registered_user"));

        if (
            registered &&
            registered.email === email &&
            registered.password === password
        ) {
            const expiry = Date.now() + 5 * 60 * 1000;

            localStorage.setItem("user", JSON.stringify(registered));
            localStorage.setItem("session_expiry", expiry.toString());

            setUser(registered);
            setTimeLeft(5 * 60 * 1000);

            return true;
        }

        return false;
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("session_expiry");
        setUser(null);
        setTimeLeft(0);
    };

    const updateUser = (updatedData) => {
        if (!user) return;

        const updatedUser = {
            ...user,
            ...updatedData,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
        localStorage.setItem("registered_user", JSON.stringify(updatedUser));

        setUser(updatedUser);
    };

    const formattedTime = (() => {
        if (!timeLeft || timeLeft <= 0) return "0:00";

        const totalSeconds = Math.floor(timeLeft / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    })();

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                updateUser,
                formattedTime,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
};
