import React from 'react'
import {Box,Typography, Button} from "@mui/material";
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export default function SuccessBox(props) {
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
  
  return (
    <Box sx={style}>
        <CheckBoxIcon sx={{width:100,height:100,color:"#3abca7"}}></CheckBoxIcon>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.props.message} Successfully
          </Typography>
          <Button
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
  )
}
