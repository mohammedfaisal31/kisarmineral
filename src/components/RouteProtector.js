import { useContext } from "react";
import TokenContext from "../context/TokenContext";
import {Redirect} from "react-router-dom"

export default function RouteProtector({children}){
    
    const auth = useContext(TokenContext);
    return (auth.token === "INVALID") ? <Redirect to="/login"/> : children
}