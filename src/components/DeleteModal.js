import React,{useState} from 'react'
import { Modal,Box, Typography,Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import SuccessBox from './SuccessBox';

export default function DeleteModal(ModalOperator) {
  const[showSuccessBox,setShowSuccessBox] = useState(false)
  const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const handleClose = ()=> ModalOperator.props[1](false);
  
  const handleDeleteRecord = ()=>{
    console.log(ModalOperator.props[0].details);
    axios.post(`https://kisargo-api.tk/api/deleteVisitor/${ModalOperator.props[0].details.phone_number}`)
    .then(()=>setShowSuccessBox(true))
    .catch((err)=>console.log(err))
  }
  return (
    <>
    <Modal
      open = {ModalOperator.props[0].open}
      onClose= {handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
    {
    showSuccessBox ? 
    <SuccessBox props={{message:"Deleted"}}/> 
    :
    <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Are you sure you want to permanently delete this record?
      </Typography>
      <Button
            variant="outlined"
            style={{
                    color: "#3abca7",
                    borderColor: "#3abca7",
                    marginTop: "20px",
                }}
                onClick={handleClose}
            >
            CANCEL
          </Button>
          <Button
            variant="outlined"
            style={{
                    backgroundColor:"#db5a5a",
                    borderColor: "#3abca7",
                    marginTop: "20px",
                    color:"#fff",
                    marginLeft:"20px"
                }}
              onClick={handleDeleteRecord}
            >
            <DeleteIcon sx={{backgroundColor:"#db5a5a",color:"#fff",marginLeft:"5px"}}></DeleteIcon>
            Yes
          </Button>
      
    </Box>
    }
    </Modal>
    </>
  )
}
