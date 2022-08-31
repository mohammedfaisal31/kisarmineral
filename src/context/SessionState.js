import axios from "axios";
import {useState,useEffect} from "react";
import SessionContext from "./SessionContext.js";


const SessionState = ({children}) =>{
    useEffect(() => {
    
        axios.get("http://34.93.32.5:4000/api/sessionStatus")
        .then((result)=>{
          if(result)  {
            const id = result.data.message[0].session_id;
            setSessionId(id);
            axios.get(`http://34.93.32.5:4000/api/getSessionTitle/${id}`)
            .then((result)=> setSessionTitle(result.data.message[0].session_title))
            .catch();
            } 
        })
        .catch();
    }, [])
    
    const [sessionId,setSessionId] = useState(null);
    const [sessionTitle,setSessionTitle] = useState(null);
    
    const upDateSessionId = (ID)=> setSessionId(ID);
    const upDateSessionTitle = (title)=> setSessionTitle(title);
    const endSession = ()=> {
        setSessionId(null);
        setSessionTitle(null);
    }
    return (
        <SessionContext.Provider value={{sessionId,sessionTitle,upDateSessionId,upDateSessionTitle,endSession}}>
            {children}
        </SessionContext.Provider>
    )

}
export default SessionState;
