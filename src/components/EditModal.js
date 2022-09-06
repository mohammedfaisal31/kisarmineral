import React, { useState } from 'react';
import { Modal,Box, TextField,Button, Typography} from '@mui/material';
import {Formik, Field, Form} from "formik";
import {object,string} from "yup";
import { Stack } from '@mui/system';
import axios from 'axios';
import SuccessBox from './SuccessBox';


export default function EditModal(ModalOperator) {
  const initialValues={
    visitor_id:ModalOperator.props[0].details.visitor_id,
    name: ModalOperator.props[0].details.name,
    email: ModalOperator.props[0].details.email,
    registration_number: ModalOperator.props[0].details.registration_number,
    phone_number: ModalOperator.props[0].details.phone_number
    
  }
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
  const handleEntrySubmit = (values)=>{
    const phone = values.phone_number;
    delete values.phone_number;
    axios.post(`https://kisargo-api.tk/api/updateVisitor/${phone}`,values)
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
    <SuccessBox props={{message:"Modified"}}/> 
    :
    <Box sx={style}>
    <Typography>Edit Entry</Typography>
    <Formik
        initialValues={initialValues}
        onSubmit={(values, formikHelpers) => {
          handleEntrySubmit(values);
          formikHelpers.resetForm();
        }}
        validationSchema={object({
          name:string().required("Name is required").min(3,"Name too short"),
          email:string().required("Email is required").email("Invalid email"),
          phone_number:string().required("Phone is required").matches(/^[0-9]{10}$/,"Invalid number"),
          registration_number:string().required("KMC number is required"),
          visitor_id:string().required("Visitor ID is required").max(10,"Max 10 characters allowed"),
          
      })}
        
      >
        {({ errors, isValid, touched, dirty }) => (
          <Form>
                        <Field
                          as={TextField}
                          id="visitor_id"
                          name="visitor_id"
                          label="Visitor ID"
                          placeholder="Enter visitor ID"
                          variant="filled"
                          style={{ marginTop: "10px" }}
                          error={Boolean(errors.visitor_id) && Boolean(touched.visitor_id)}
                          helperText ={Boolean(touched.visitor_id) && errors.visitor_id}
                      
                        />
                        <Field
                          as={TextField}
                          id="name"
                          name="name"
                          label="Name"
                          placeholder="Enter visitor name"
                          variant="filled"
                          style={{ marginTop: "10px" }}
                          error={Boolean(errors.name) && Boolean(touched.name)}
                          helperText ={Boolean(touched.name) && errors.name}
                      
                        />
                        <Field
                          as={TextField}
                          id="email"
                          name="email"
                          label="Email"
                          placeholder="Enter visitor email"
                          variant="filled"
                          style={{ marginTop: "10px" }}
                          error={Boolean(errors.email) && Boolean(touched.email)}
                          helperText ={Boolean(touched.email) && errors.email}
                        />
                        <Field
                          as={TextField}
                          id="reg-no"
                          name="registration_number"
                          label="KMC number"
                          placeholder="Enter KMC  number"
                          variant="filled"
                          style={{ marginTop: "10px" }}
                          error={Boolean(errors.registration_number) && Boolean(touched.registration_number)}
                          helperText ={Boolean(touched.registration_number) && errors.registration_number}
                        
                        />
                        <Field
                          as={TextField}
                          disabled
                          id="phone"
                          name="phone_number"
                          label="Phone number"
                          placeholder="Enter mobile number"
                          variant="filled"
                          style={{ marginTop: "10px" }}
                          error={Boolean(errors.phone_number) && Boolean(touched.phone_number)}
                          helperText ={Boolean(touched.phone_number) && errors.phone_number}
                        
                        />
                        <Stack spacing={2}>
                        <Button
                          type="button"
                          onClick={handleClose}
                          variant="outlined"
                          style={{
                            color: "#11acba",
                            borderColor: "#11acba",
                            marginTop: "20px",
                          }}
                        >
                          CANCEL
                        </Button>
                        <Button
                          type="submit"
                          variant="outlined"
                          style={{
                            color: "#FFF",
                            backgroundColor: "#3abca7",
                            borderColor: "#3abca7",
                            marginTop: "20px",
                          }}
                        >
                          CONFIRM
                        </Button>
                        </Stack>
          </Form>
        )}
      </Formik>
      
    </Box>

    }
    
        </Modal>
    </>
  )
}
