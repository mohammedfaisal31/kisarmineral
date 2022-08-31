import React from 'react'
import QRCode from "react-qr-code";
import VisitorPropsContext from '../context/VisitorPropsContext';
import { useContext,useEffect } from 'react';
import Typography from '@mui/material/Typography';
import "../components/css/QRCode.css";
import "../App.css";
import { useHistory } from 'react-router-dom';
export default function QRFinal() {
    const visitorPropsHandler = useContext(VisitorPropsContext);
    const history = useHistory();
    useEffect(()=>{
        window.print();
        window.addEventListener("afterprint",history.push("/dashboard"));
    })
    return (
    <div className='RotatedDivContainer'>
      <Typography style={{fontSize:"90px",fontWeight:"bolder"}} className="NamePrint" variant="h4" display="block" gutterBottom>
        {visitorPropsHandler.visitorProps.name}
        </Typography>
    <div className="RotatedDiv">
    <QRCode
      value={visitorPropsHandler.visitorProps.visitor_id}
      size={350}
      level={"L"}
    />
    <Typography style={{fontSize:"50px"}}className="IDprint" variant="button" display="block" gutterBottom>
      ID : {visitorPropsHandler.visitorProps.visitor_id}
      </Typography>
    
  </div>
        
    </div>
  )
}
