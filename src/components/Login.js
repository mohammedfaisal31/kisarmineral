import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import "../App.css";
import {Formik, Field, Form} from "formik";
import {object,string} from "yup";
import axios from "axios"
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import { useContext } from 'react';
import TokenContext from '../context/TokenContext';
import { useHistory  } from 'react-router-dom';

export default function Login(){
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
    const loginButtonStyle = {backgroundColor:"#3abca7",marginTop:"18px"}
    const signupButtonStyle = {backgroundColor:"#3abca7"}

    const initialValues = {
        email:"",
        password:""
    }
    const auth = useContext(TokenContext);
    const history = useHistory();
    const  handleLoginSuccess =  () =>{
        setIfDisplayAlert("none");
        auth.login("VALID");
        history.push("/dashboard");
    }
    const handleLoginSubmit = (values) =>{
        axios.post("http://34.93.32.5:4000/api/login",values)
        .then((result)=>result.data === "LOGIN_SUCCESS" ? handleLoginSuccess() : result.data === "LOGIN_UNSUCCESS" ? setIfDisplayAlert("flex"): console.log("UNKNOWN_ERROR1"))
        .catch();
    }
    
    return (<>
        
       <Grid container>
        <Paper elevation={5} style={paperStyle}>
            <Grid align="center" style={gridStyle} >
                <Avatar style={keyStyle}><KeyOutlinedIcon /></Avatar>
                <p style={pStyle}>Mineral Login</p>
            </Grid>
            <Alert style={{display:ifDisplayAlert}} severity="error">Email or password is wrong, Please re Enter</Alert>
            <Formik initialValues={initialValues} 
                    style={{marginTop:"10px"}}
                    onSubmit={(values,formikHelpers)=>{
                        handleLoginSubmit(values);
                        formikHelpers.resetForm();
                        
                    }}
                   validationSchema={object({
                        email:string().required("Email is required").email("Invalid email"),
                        password:string().required("Password is required").min(8,"Unusual password")
                    })}
                >
                {({errors,isValid,touched,dirty})=>(
                    <Form>
                    <Grid align="center" >
                    <Field as={TextField} 
                            id="email" 
                            name="email" 
                            label="Email" 
                            variant="standard" 
                            placeholder='Enter email' 
                            error={Boolean(errors.email) && Boolean(touched.email)}
                            helperText ={Boolean(touched.email) && errors.email}
                        />
                    
                    <Field as={TextField} 
                            id="password" 
                            name="password" 
                            label="Password" 
                            type="password" 
                            variant="standard" 
                            placeholder='Enter the password'
                            margin="normal"
                            error={Boolean(errors.password) && Boolean(touched.password)}
                            helperText ={Boolean(touched.password) && errors.password}
                        />
                
                </Grid>    
                <Grid align="center" >
                    <Button type="submit" variant="contained" style={loginButtonStyle}>Login</Button>
                </Grid>
                </Form>
                )}
            </Formik>


            <Grid style={{marginTop:"20px"}}  >
                <hr/>
                <Link href="#" underline="always" color="primary" >Forgot Password?</Link>
                <p>Do not have an account?</p>
                <Button href="/register" variant="contained" style={signupButtonStyle} fullWidth>Sign UP</Button>
            </Grid >
            
            </Paper>
       </Grid>
       
       
        </>);
}