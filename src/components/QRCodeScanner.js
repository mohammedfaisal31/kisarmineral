import React, { useState,useContext,useEffect } from 'react'
import QrReader from 'react-qr-reader-es6';
import useSound from 'use-sound';
import beep from "../mp3/beep.mp3";
import errorSound from "../mp3/error.mp3";
import SessionContext from '../context/SessionContext';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import Box from '@mui/material/Box';
import { Grid, Paper } from '@mui/material';
import Navbar from './Navbar';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';


function QRCodeScanner() {
  const[openScan,setOpenScan] = useState(false);
  const handleError = (err)=> console.log(err);
  const sessionHandler = useContext(SessionContext);
  const [showGrantedAlert, setShowGrantedAlert] = useState(false);
  const [showDeniedAlert, setShowDeniedAlert] = useState(false);
  const [scannedId,setScannedId] = useState(null);
  const [dynamicWindowWidth,setDynamicWindowWidth] = useState(450);
  const constraints = {
    facingMode: { exact: "environment" }
  };
  
  const openScanner = ()=>{
    setOpenScan(true);
    setShowGrantedAlert(false);
    setShowDeniedAlert(false);
  }
  const closeScanner = ()=> setOpenScan(false)
  const handleScan =  (visitor_id)=>{
    if(visitor_id){
      setScannedId(visitor_id)
      setOpenScan(false); 
      const session_obj = {visitor_id:visitor_id,session_id:sessionHandler.sessionId};
      axios.get(`https://kisargo-api.tk/api/getPermission/${session_obj.visitor_id}/${session_obj.session_id}`)
      .then((result)=>{
        if(result.data.message.length === 0){
          playError(); 
          setShowDeniedAlert(true);
        } 
        else if (result.data.message[0].permissionGranted){
          revokePermission(session_obj)
          .then((result)=>{
            if(result.data === 'OK')  {
              playBeep();
              setShowGrantedAlert(true);
            }
          })
          .catch();
        } 
        else {
          playError();
          setShowDeniedAlert(true);
        }  
      }
    )
    } 
    
  }
  
  useEffect(() => {
    const handleResize = () => setDynamicWindowWidth(getWindowWidth()) 
    window.addEventListener("resize",handleResize)
  
    return () => {
      window.removeEventListener("resize",handleResize);
    }
  }, [])
  



  const [playBeep] = useSound(beep);
  const [playError] = useSound(errorSound);
  
  return (<>
          <Navbar/>
          {
          sessionHandler.sessionId !== null ?
          <>
          <Grid
            container
            sx={{
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              textAlign:"center",
              flexDirection:"column",
              marginTop:"15vh"
              
            }}
          >
            <Paper elevation={5}
            >
              
          <Box
            sx={{
            borderRadius:"10px",
            width: getDynamicWidth(dynamicWindowWidth) ,
            height: "fit-content",
            backgroundColor: "#fff",
            '&:hover': {
            boxShadow:"5px",
            cursor:"pointer",
            opacity: [0.9, 0.8, 0.7],
            },
            
          }}
          >
            {
            openScan && 
            <QrReader
                delay={200}
                onError={handleError}
                onScan={handleScan}
                constraints	= {constraints}
            />
            }
            
            {openScan &&
              <div>
                <DoDisturbIcon onClick={closeScanner} style={{width:200,height:200,color:"#808080"}}>Scan</DoDisturbIcon>
                <p style={{fontWeight:"bold"}}>CLOSE SCANNER</p>
            </div>
            }
            {!openScan &&
              <div>
                <QrCodeScannerIcon onClick={openScanner} style={{width:200,height:200,color:"#3abca7"}}>Scan</QrCodeScannerIcon>
                <p style={{fontWeight:"bold"}}>SCAN A QR CODE</p>
            </div>
            }

            {
            showGrantedAlert &&
            <Alert severity="success">
              <AlertTitle>Granted</AlertTitle>
                Visitor {scannedId} was granted — <strong>Please scan next QR code</strong>
            </Alert>
            }
          {
            showDeniedAlert &&
          <Alert severity="error">
            <AlertTitle>Visitor {scannedId} Denied</AlertTitle>
              Visitor was denied — <strong>Please scan next QR code</strong>
          </Alert>
        }
          </Box>
          </Paper>
          </Grid>
          </>
        :
        <>
          <Paper elevation={5} style={{marginTop:"5px", width:dynamicWindowWidth/2}}>
          <Alert severity="error">Please create a valid session first.<a href="/createSession" style={{color:"blue"}}>Click here</a>
          </Alert>
          </Paper>
        </>
        } 
           
    </>
  )
}


export default QRCodeScanner;

const revokePermission = ((session_obj)=>{
    return axios.post(`https://kisargo-api.tk/api/revokePermission/${session_obj.visitor_id}/${session_obj.session_id}`)

  })
const getWindowWidth = ()=>{
  return window.innerWidth;
}

const getDynamicWidth = (dynamicWindowWidth)=>{
  return dynamicWindowWidth > 572 ? 460 : dynamicWindowWidth < 365 ? dynamicWindowWidth * 0.9 : dynamicWindowWidth * 0.7;
}