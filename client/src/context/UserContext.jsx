import { createContext, useContext, useState } from 'react';

// Create a context for user authentication
const UserContext = createContext();

// Context provider component to manage user state
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); 

  const logIn = (userData) => {
    setUser(userData);  // Logs in a user
  };

  const logOut = () => {
    setUser(null);  // Logs out the user
  };

  return (
    <UserContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access user context
// call useUser() to access the user, logIn, and logOut
const useUser = () => useContext(UserContext);

// Export the provider and hook
export { UserProvider, useUser };