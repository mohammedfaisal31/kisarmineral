import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import {Formik, Field, Form} from "formik";
import {object,string,ref} from "yup";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { useState } from 'react';

export default function Register(){
    const history = useHistory();
    const [ifDisplayAlert,setIfDisplayAlert] = useState("none");
    const paperStyle = {padding:20,height:"fit-content",width:"40vh",margin:"20vh auto"};
    const pStyle = {fontSize:"25px",fontWeight:"bold",margin:"10px 20px "};
    const keyStyle = {backgroundColor:'#3abca7'};
    const gridStyle = {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    } //CSS to make grid responsive
    const signupButtonStyle = {backgroundColor:"#3abca7",marginTop:"18px"}
    const loginButtonStyle = {backgroundColor:"#3abca7"}
    const initialValues = {
        pname:"",
        email:"",
        phone:"",
        password:"",
        confirm_password:""
    }
    const handleRegisterSubmit = (values) =>{
        delete values.confirm_password;

        axios.post("https://kisargo-api.tk/api/register",values)
        .then((result)=>result.data === "ROW_INSERTED" ? history.push("/login") : (result.data === "DUP_ENTRY" ? setIfDisplayAlert("flex") : alert("Unknown error")))
        .catch();
    }
    return (
    <>
        <Grid >
        <Paper elevation={5} style={paperStyle}>
            <Grid align="center" style={gridStyle}>
                <Avatar style={keyStyle}><HowToRegIcon /></Avatar>
                <p style={pStyle}>KisarGo Register</p>
            </Grid>
            <Alert style={{display:ifDisplayAlert}} severity="error">User already exists</Alert>
            <Formik initialValues={initialValues} 
                    onSubmit={(values,formikHelpers)=>{
                        handleRegisterSubmit(values);
                        formikHelpers.resetForm();
                    }}
                   validationSchema={object({
                        pname:string().required("Name is required").min(3,"Name too short"),
                        email:string().required("Email is required").email("Invalid email"),
                        phone:string().required("Phone is required").matches(/^[0-9]{10}$/,"Invalid number"),
                        password:string().required("Password is required").min(8,"Unusual password"),
                        confirm_password:string().required("Please confirm your password").oneOf([ref('password'), null], "Passwords don't match.")
                                            
                    })}
                >
                {({errors,isValid,touched,dirty})=>(
                   <Form>
                    <Grid align="center">
                        <Field as={TextField} 
                                name="pname" 
                                id="pname" 
                                label="Name" 
                                variant="standard" 
                                placeholder='Enter your Name' 
                                error={Boolean(errors.pname) && Boolean(touched.pname)}
                                helperText ={Boolean(touched.pname) && errors.pname}
                            
                                />
                        <Field as={TextField} 
                                name="email"
                                id="email" 
                                label="Email" 
                                variant="standard" 
                                placeholder='Enter your email' 
                                margin="normal"
                                error={Boolean(errors.email) && Boolean(touched.email)}
                                helperText ={Boolean(touched.email) && errors.email}
                            />
                        <Field as={TextField} 
                                name="phone"
                                id="phone" 
                                label="Phone" 
                                variant="standard" 
                                placeholder='Enter your phone number' 
                                margin="normal"
                                error={Boolean(errors.phone) && Boolean(touched.phone)}
                                helperText ={Boolean(touched.phone) && errors.phone}
                            />
                        <Field as={TextField} 
                                name="password"
                                id="password" 
                                label="Password" 
                                type="password" 
                                variant="standard" 
                                placeholder='Enter the password' 
                                margin="normal"
                                error={Boolean(errors.password) && Boolean(touched.password)}
                                helperText ={Boolean(touched.password) && errors.password}
                            / >
                        <Field as={TextField} 
                                name="confirm_password"
                                id="confirm_password" 
                                label="Confirm Password" 
                                type="password" 
                                variant="standard" 
                                placeholder='Confirm password' 
                                margin="normal"
                                error={Boolean(errors.confirm_password) && Boolean(touched.confirm_password)}
                                helperText ={Boolean(touched.confirm_password) && errors.confirm_password}
                            / >
            
                     </Grid>    
                      <Grid align="center">
                        <Button type="submit" variant="contained" style={signupButtonStyle}>Register</Button>
                      </Grid>
                    </Form> 
                )}
                
            </Formik>
           
                <hr/>
                <p >Already have an account?</p>
                <Button href="/login" variant="contained" style={loginButtonStyle} fullWidth>Login</Button>
            </Paper>
       </Grid>
    </>
    );      
}