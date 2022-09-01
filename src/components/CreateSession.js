import React,{useState,useContext} from 'react'
import { Button, Paper, Stack, TextField,Backdrop ,CircularProgress, Typography} from '@mui/material'
import { Formik,Field,Form } from 'formik';
import {object,string} from "yup";
import SessionContext from '../context/SessionContext.js';
import uuid from 'react-uuid';
import axios from "axios";

export default function CreateSession() {
    const [sessionOn, setSessionOn] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showCreateButton, setShowCreateButton] = useState(true);
    const [showEndButton, setShowEndButton] = useState(false);
    const [showBackdrop,setShowBackdrop] = useState(false);
    const sessionHandler = useContext(SessionContext);
    
    const createSession = ()=>{
        setShowForm(true);
        
    }
    const endSession = ()=>{
        sessionHandler.endSession();
        setSessionOn(false);
        setShowEndButton(false);
        setShowCreateButton(true);
        
    }
    const initialValue = {
        session_title:"First day"
    }
    const handleSubmit =  ( async (value)=>{
        setShowBackdrop(true);
        setShowForm(false);
        setShowCreateButton(false);
        setShowEndButton(true);
        const session_id = await generateID();
        await consoleRegisterAllVisitors({session_title:value.session_title,session_id:session_id})
        .then((result)=>{
            if(result) setShowBackdrop(false);
        })
        .then(()=>{
             axios.post(`https://kisargo-api.tk/api/addSession/${session_id}`)
            .catch()
        })
        .catch();
        
    })
    
    
    return (
    
    <>
    
     <Paper elevation={5}>
     {showBackdrop && 
     <Backdrop
     sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
     open={showBackdrop}
    >
    <Stack spacing={2} sx={{textAlign:"center"}}>
     <CircularProgress color="inherit" />
     <Typography >Creating Session</Typography>
     </Stack>
    </Backdrop>
     
     }
        <h1>{sessionOn}</h1>
        <h1>{sessionHandler.sessionId}</h1>
        <h1>{sessionHandler.sessionTitle}</h1>
        
        <Stack spacing={2}>
        {showEndButton && <Button type="button" onClick={endSession} variant="contained" style={{width:200}}>End Session</Button>}
        {showCreateButton && <Button type="button" onClick={createSession} variant="contained" style={{width:200}}>Create Session</Button>}
        {
        showForm &&
        <div className='sessionForm'>
        <h1>Session Creation</h1>
        <Formik initialValues={initialValue} 
                    style={{marginTop:"10px"}}
                    onSubmit={(value,formikHelpers)=>{
                        handleSubmit(value);
                        formikHelpers.resetForm();
                        
                    }}
                   validationSchema={object({
                    session_title:string().required("Session title is required")
                    })}
                >
                 {({errors,isValid,touched,dirty})=>(
                    <Form>
                        <Field as={TextField} 
                            id="session_title" 
                            name="session_title" 
                            label="Session Title" 
                            variant="outlined" 
                            placeholder='Enter Session Title' 
                            error={Boolean(errors.session_title) && Boolean(touched.session_title)}
                            helperText ={Boolean(touched.session_title) && errors.session_title}
                        />
                    <Button type="submit" variant="contained">Submit</Button>
        
                    </Form>

                )}
                    
        
        </Formik>
        </div>
        }
        </Stack>
        </Paper>
    </>
  )
}


const generateID = async () =>{
    const uid = uuid();
    return uid.slice(0, uid.indexOf("-"));
}

const consoleRegisterAllVisitors = async (session_params) => {
   return getAllVisitorsIds()
         .then((result)=>
    
                 result.data.message.map(visitor_object=>{
                 return new Promise((resolve,reject)=>{
                     axios.post(`https://kisargo-api.tk/api/addConsoleEntry/${visitor_object.visitor_id}`,session_params)
                     .then((result)=>resolve(result.data))
                     .catch((err)=>reject(err));
                 })
                 .catch();
             })

     )
}

const getAllVisitorsIds = ()=>{
    return new Promise((resolve,reject)=>{
        axios.get("https://kisargo-api.tk/api/getAllVisitorIds")
        .then((result)=> resolve(result))
        .catch((err)=>reject(err));
    })
}