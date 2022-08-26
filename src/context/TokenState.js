import {useState} from "react";
import  TokenContext  from "./TokenContext.js";


const TokenState = ({children}) =>{
    const [token,setToken] = useState("INVALID");

    const login = (updatedToken) =>{
        setToken(updatedToken);
    }
    const logout = (updatedToken) =>{
        setToken(updatedToken);
    }
    
    return (
        <TokenContext.Provider value={{token,login,logout}}>
            {children}
        </TokenContext.Provider>
    )

}
export default TokenState;
