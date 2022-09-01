import { Button } from '@mui/material'
import axios from 'axios';
import React,{useContext} from 'react'
import SessionContext from '../context/SessionContext'

export default function EndSession() {
  const sessionHandler = useContext(SessionContext);
const endSession = () =>{
    axios.post(`https://kisargo-api.tk/api/deleteSession/${sessionHandler.sessionId}`)
    .then()
    .catch()
  }
  return (
    <>
        <h1>{sessionHandler.sessionId}</h1>
        <h1>{sessionHandler.sessionTitle}</h1>
        <Button onClick={endSession} variant="contained">End</Button>
    </>
  )
}
