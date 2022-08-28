import React, { useState, useRef,useEffect } from 'react'
import {Box,Modal,Typography, Button,Backdrop,CircularProgress} from "@mui/material";
import "../App.css";
import {useCSVReader} from "react-papaparse"
import axios from "axios";
import uuid from "react-uuid";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
export default function CSVModal({showMe}) {
    const [visitorDataList,setVisitorDataList] = useState(null);
    const visitorDataListRef = useRef();
    const[openBackDrop,setOpenBackDrop] = useState(false);
    const[success,setSuccess] = useState(false);
    const [dynamicWindowWidth,setDynamicWindowWidth] = useState(getInitialWidth())
  
    visitorDataListRef.current = visitorDataList;
    const box1_style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: dynamicWindowWidth,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      };
      const {CSVReader} = useCSVReader();
      const styles = {
          csvReader: {
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 10,
          } ,
          browseFile: {
            width: '40%',
            color: "#3abca7",
            borderColor: "#3abca7",
            marginTop: "10px"
          } ,
          acceptedFile: {
            border: '1px solid #ccc',
            height: 45,
            lineHeight: 2.5,
            paddingLeft: 10,
            width: '80%',
            marginTop:"10px"
          } ,
          remove: {
            borderRadius: 0,
            padding: '0 20px',
            width:"40%",
            color: "red",
            borderColor: "red",
            marginTop: "10px"
          } ,
          progressBarBackgroundColor: {
            backgroundColor: '#3abca7',
            marginTop:"10px"
          } 
        };
    const handleClose = ()=>{
    showMe[1](false)
  }

  const handleUpload=(results)=>{
    const headings = results.data[0].map((heading,index)=>{
        return {accessor:heading}
    })
    
    const rows = results.data.slice(1).map((row)=>{
          return row.reduce((acc,curr,index)=>{
               acc[headings[index].accessor] = curr;
               return acc;
          },{});
     })
    setVisitorDataList(rows.slice(0,rows.length-1));
}
  
 const handleSubmit = ()=>{
    setOpenBackDrop(true);
    if(visitorDataListRef.current !== null){
        const visitorDataArray = visitorDataListRef.current;
        visitorDataArray.map(async (visitorDataObject)=>{
            const uid = uuid();
            const temp_visitor_id = uid.slice(0, uid.indexOf("-"));
            visitorDataObject.visitor_id = temp_visitor_id;
            return registerVisitor(visitorDataObject)
            .then((result)=> {
                if(result.data !== "ROW_INSERTED") {
                alert("Unknown error")
                handleClose()
                }else setSuccess(true);
            })
            .catch((err)=>console.log(err));
    })
    }
    setOpenBackDrop(false);
 };
 
 useEffect(() => {
    
    const handleResize = () => setDynamicWindowWidth(getDynamicWidth()) 
    window.addEventListener("resize",handleResize)
  
    return () => {
      window.removeEventListener("resize",handleResize);
    }
  }, [])

  
  
  return (
    <>
    
    <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

    
    <Modal
        open={showMe[0]}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {success ?
        <Box sx={box1_style}>
        <CheckBoxIcon sx={{width:100,height:100,color:"#3abca7"}}></CheckBoxIcon>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Registrations Successfull
          </Typography>
          <Button
            onClick={handleClose}
            variant="outlined"
            style={{
                    color: "#3abca7",
                    borderColor: "#3abca7",
                    marginTop: "20px",
                }}
            >
            CLOSE
          </Button>
          </Box>  
      : <Box sx={box1_style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Upload CSV
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Drag and drop CSV here
            
          </Typography>
          
          <CSVReader
        onUploadAccepted={(results) => {
        handleUpload(results)
      }}
      
    >
      {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
      }) => (
        <>
          <div style={styles.csvReader}>
            <Button variant="outlined" type='button' {...getRootProps()} sx={styles.browseFile}>
              Browse file
            </Button>
            {!acceptedFile && <Typography sx={{marginTop:"10px"}}>No file selected</Typography>}
            {acceptedFile &&<div style={styles.acceptedFile}>
              {acceptedFile && acceptedFile.name}
            </div>
            }
            <ProgressBar style={styles.progressBarBackgroundColor} />
       
            {acceptedFile &&
            <Button variant="outlined" {...getRemoveFileProps()} sx={styles.remove}>
              Remove
            </Button>
            }
          </div>
        </>
      )}
    </CSVReader>
          <Button
            onClick={handleClose}
            variant="outlined"
            style={{
                    color: "#3abca7",
                    borderColor: "#3abca7",
                    marginTop: "20px",
                }}
            >
            CLOSE
          </Button>
          <Button
            onClick={handleSubmit}
            variant="outlined"
            style={{
                    color: "#FFF",
                    backgroundColor: "#3abca7",
                    borderColor: "#3abca7",
                    marginTop: "20px",
                    marginLeft:"10px"
                }}
            >
            Upload
          </Button>
        </Box>
        }
      </Modal>
      
    </>
  )
}

const registerVisitor = (visitorDataObject)=>{
    return axios.post("https://mineral-api-server.herokuapp.com/api/registerVisitor", visitorDataObject)
}


  const getDynamicWidth = (dynamicWindowWidth = window.innerWidth)=>{
    return dynamicWindowWidth > 572 ? 460 : dynamicWindowWidth < 365 ? dynamicWindowWidth * 0.6 : dynamicWindowWidth * 0.4;
  }

  const getInitialWidth = ()=>{
    return window.innerWidth > 572 ? 460 : window.innerWidth*0.7
  }