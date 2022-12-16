import { createContext, ReactNode, useState } from "react";

type AuthContextProps = {
    children: ReactNode;
};
type AuthContextTypes = {
    username: string | null;
    setUsername: React.Dispatch<React.SetStateAction<string | null>>
    userId: string | null;
    setUserId: React.Dispatch<React.SetStateAction<string | null>>
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>
    isLogged: string;
    setIsLogged: React.Dispatch<React.SetStateAction<string>>

}

export const AuthContext  = createContext<AuthContextTypes>({} as AuthContextTypes);

export const AuthProvider = ({children}: AuthContextProps)=>{
    const [username, setUsername]=useState(localStorage.getItem('username') || null)
    const [userId, setUserId]=useState(localStorage.getItem('userId')|| null)
    const [token, setToken]=useState(localStorage.getItem('token')|| null)
    const [isLogged, setIsLogged]=useState(localStorage.getItem('isLogged') || '0');
    
    return(
        <AuthContext.Provider value={{userId, setUserId, isLogged, setIsLogged, token, setToken, username, setUsername} }>
            {children}
        </AuthContext.Provider>
    )
}
