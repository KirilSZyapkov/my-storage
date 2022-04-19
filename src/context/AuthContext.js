import React, { useContext, useState, useEffect } from 'react';
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();

    async function register(email, password) {
        return await auth.createUserWithEmailAndPassword(email, password);
    }

    // function login(email, password) {
    //     return auth.createUserWithEmailAndPassword(email, password);
    // }

    // function logout() {
    //     return auth.createUserWithEmailAndPassword(email, password);
    // }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        });

        return unsubscribe;

    }, [])

    console.log(currentUser);


    const value = {
        currentUser,
        register,
        // login,
        // logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

