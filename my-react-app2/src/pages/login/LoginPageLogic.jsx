import React, { useState } from 'react';

const LoginPageLogic = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        // Add your login logic here, e.g., make API call, check credentials, etc.
        console.log(`Logging in with username: ${username} and password: ${password}`);
    };

    return {
        username,
        password,
        handleUsernameChange,
        handlePasswordChange,
        handleLogin,
    };
};

export default LoginPageLogic;
