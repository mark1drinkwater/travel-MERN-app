import { createContext } from "react";

// We now have a object we can share between components
// When we update it, any component that listens to it will get updated too.
export const AuthContext = createContext({
    isLoggedIn: false, 
    // These functions are our abstract methods so to say
    login: () => {}, 
    logout: () => {} 
});




















