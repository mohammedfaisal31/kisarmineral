import React,{useState,useContext} from 'react'
import { Button, Stack, TextField } from '@mui/material'
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
        setShowForm(false);
        setShowCreateButton(false);
        setShowEndButton(true);
        const session_id = await generateID();
        await consoleRegisterAllVisitors({session_title:value.session_title,session_id:session_id})
        .then(()=>{
            axios.post(`https://mineral-api-server.herokuapp.com/api/addSession/${session_id}`)
            .catch()
        })
        .catch();
        
    })
    
    
    return (
    
    <>
        <h1>{sessionOn}</h1>
        <h1>{sessionHandler.sessionId}</h1>
        <h1>{sessionHandler.sessionTitle}</h1>
        <Stack spacing={2}>
        {showEndButton && <Button type="button" onClick={endSession} variant="contained">End Session</Button>}
        {showCreateButton && <Button type="button" onClick={createSession} variant="contained">Create Session</Button>}
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
    </>
  )
}


const generateID = async () =>{
    const uid = uuid();
    return uid.slice(0, uid.indexOf("-"));
}

const consoleRegisterAllVisitors = async (session_params) => {
   getAllVisitorsIds()
         .then((result)=>
    
                 result.data.message.map(visitor_object=>{
                 return new Promise((resolve,reject)=>{
                     axios.post(`https://mineral-api-server.herokuapp.com/api/addConsoleEntry/${visitor_object.visitor_id}`,session_params)
                     .then((result)=>resolve(result.data))
                     .catch((err)=>reject(err));
                 })
                 .catch();
             })

     )
}

const getAllVisitorsIds = ()=>{
    return new Promise((resolve,reject)=>{
        axios.get("https://mineral-api-server.herokuapp.com/api/getAllVisitorIds")
        .then((result)=> resolve(result))
        .catch((err)=>reject(err));
    })
}