import React from 'react'
import QRCode from "react-qr-code";
import VisitorPropsContext from '../context/VisitorPropsContext';
import { useContext } from 'react';
import Typography from '@mui/material/Typography';
import "../components/css/QRCode.css";
import "../App.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';

export default function QRCodeWrap() {
  const visitorPropsHandler = useContext(VisitorPropsContext);
  const history = useHistory();
  const handlePrint = ()=>{
      history.push("/qrfinal");
  }
  return (
  
  <>
    <div className="r-text">
                        <p className="r-text-p">Generated QR Code</p>
                        <button
                          type="button"
                          className="close-btn"
                        >
                          <span className="close">&times;</span>
                        </button>
    </div>
    <QRCode
      value={visitorPropsHandler.visitorProps.visitor_id}
      size={150}
      level={"L"}
      style={{marginTop:"20px"}}
    />
    <Typography className="ID" variant="button" display="block" gutterBottom>
      ID : {visitorPropsHandler.visitorProps.visitor_id}
      </Typography>
    
      <Typography style={{fontFamily:"'Silkscreen', cursive"}} className="Name" variant="h4" display="block" gutterBottom>
          {visitorPropsHandler.visitorProps.name}
      </Typography>
      <Stack spacing={2} direction="row" style={{marginBottom:"10px"}}>
      <Button variant="outlined" style={{color:"#3abca7",borderColor:"#3abca7"}}>Cancel</Button>
      <Button onClick={handlePrint} variant="contained" style={{backgroundColor:"#3abca7",borderColor:"#3abca7"}}>Print</Button>
    </Stack>

  </>
  )
}

export  function QRCodePrint() {
  return (
    <div>QRCodeWrap</div>
  )
}

