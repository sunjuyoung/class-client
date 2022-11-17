import { createContext,useState,useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth,setAuth] = useState();

    useEffect(() => {
        setAuth({
            user:localStorage.getItem("user"),
            accessToken:localStorage.getItem("ACCESS_TOKEN"),
        })
      }, []);

    return(
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;