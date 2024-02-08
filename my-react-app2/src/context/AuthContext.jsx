// AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user1, setUser1] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        // Check if a token exists in local storage during component initialization
        const storedToken = localStorage.getItem('Authorization');

        if (storedToken) {
            // If a token exists, fetch user information and set the user state
            const fetchUser = async () => {
                try {
                    const response = await fetch('http://localhost:10010/auth/getCurrentUser', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${storedToken}`,
                        },
                        credentials: 'include',
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        const userRole = userData.authorities;
                        setUser1(userRole);
                    } else {
                        console.error('Failed to fetch current user');
                    }
                } catch (error) {
                    console.error('Role failed:', error.message);
                }
            };

            fetchUser();
        }
    }, [navigate]);


    const login =  async (token) => {
        // Parse the token and set the user state
        try {
            const response = await fetch('http://localhost:10010/auth/getCurrentUser', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Include the token in the headers
                },
                credentials: 'include',
            });

            if (response.ok) {
                // If the request is successful, parse the response JSON
                const userData = await response.json();
                // console.log('Current user:', userData);

                const userRole = userData.authorities;
                // console.log('User role:', user);
                console.log('User role:', userRole);
                setUser1(userRole);


            } else {
                console.error('Failed to fetch current user');
            }
        } catch (error) {
            console.error('Role failed:', error.message);
        }

    };

    const logout = () => {
        // Clear user state and remove token from localStorage
        setUser1(null);
        localStorage.removeItem('Authorization');
    };

    // const parseToken = (token) => {
    //     // Implement token parsing logic (decode the token, extract user info)
    //     // Return the user object with role information
    //     // Example: { username: 'example', role: 'admin' }
    // };

    return (
        <AuthContext.Provider value={{ user1, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
