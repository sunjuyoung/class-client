import { createContext,useState,useEffect } from "react";


const INITIAL_STATE = {
    user: localStorage.getItem("user") || null,
    role: localStorage.getItem("role") || null,
    accessToken : localStorage.getItem("ACCESS_TOKEN") || null,
    loading: false,
    error: null,
  };

const AuthContext = createContext(INITIAL_STATE);

export const AuthProvider = ({ children }) => {
    const [auth,setAuth] = useState(INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", auth.user);
        localStorage.setItem("role", auth.role);
        localStorage.setItem("ACCESS_TOKEN", auth.accessToken);
      }, [auth.accessToken]);

    return(
        <AuthContext.Provider value={{ auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;