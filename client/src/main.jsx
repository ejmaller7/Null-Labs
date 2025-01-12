import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { UserProvider } from './context/UserContext';

// Render app
// Can use logIn()/logOut() in app
ReactDOM.createRoot(document.getElementById('root')).render(
    <UserProvider>
        <App />
    </UserProvider>    
);
