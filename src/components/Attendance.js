import React,{useEffect,useState} from 'react'
import { Grid,Paper ,TextField,MenuItem, Button} from '@mui/material';
import axios from 'axios';
import { Stack } from '@mui/system';
import AttendanceTable from './AttendanceTable.js';
export default function Attendance() {
    const[sessions,setSessions] = useState([{}]);
    const[selectedSessionID,setSelectedSessionID] = useState("");
    const[showTable,setShowTable] = useState(false);
    
    
    const paperStyle = {padding:20,height:"fit-content",width:"40vh",margin:"20vh auto",textAlign:"center"};
    const tstyle = {fontSize:"25px",fontWeight:"bold",margin:"10px 20px "};
    useEffect(() => {
      
        axios.get("https://kisargo-api.tk/api/getAllSessions")
        .then((result)=>setSessions(result.data.message))
        .catch((err)=>console.log(err));
    
    }, [])
    const handleSessionChange= (e)=>{
        setSelectedSessionID(e.target.value);
    }
    const handleButtonclick= (e)=>{
        e.preventDefault();
        setShowTable(true);
    }
    
    return (
            <>
                {showTable && selectedSessionID
                ? 
                <AttendanceTable props={{selectedSessionID}}/>
                :
                <Grid container >
                    <Paper elevation={5} style={paperStyle}>
                    <p style={tstyle} >Select session</p>
                    <TextField
                        labelId="session-select"
                        id="session-select"
                        label="Session"
                        defaultValue="None"
                        select
                        sx={{marginTop:"10px"}}
                        onChange={(e)=>handleSessionChange(e)}
                    >
                        <MenuItem disabled value={"None"}>Please Select Session</MenuItem>
                            {sessions.map(item=>{
                                return <MenuItem value={item.session_id}>{item.session_title}</MenuItem>
                            })}
                    </TextField>
                    <Stack sx={{marginTop:"10px"}}>
                        <Button onClick={(e)=>handleButtonclick(e)} variant="outlined" style={{backgroundColor:"#3abca7",color:"#fff",borderColor: "#3abca7"}}>check attendees</Button>
                    </Stack>
                    </Paper>
        
                 </Grid>
                
                 }
                </>
  )
}

