import axios from 'axios';
import React from 'react';
import { useEffect,useState ,useRef} from 'react';
import Navbar from './Navbar.js';
import { 
        Paper, 
        Typography,
        Toolbar,
        TextField, 
        MenuItem,
        Table,
        TableContainer,
        TableHead,
        TableRow,
        TableBody,
        TableCell,
        TablePagination,
        Button
    } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import ReplayIcon from '@mui/icons-material/Replay';
export default function AttendanceTable(props) {
  const[selectedSessionID,setSelectedSessionID] = useState("");
  const[selectedSessionTitle,setSelectedSessionTitle] = useState("");
  const[refresh,setRefresh] = useState(false);
  const[records,setRecords] = useState([]);
  const recordRef = useRef();
  const pages = [10,30,50,Math.floor(records.length/2)]
  const[page,setPage] = useState(0);
  const [recordsPerPage,setRecordsPerPage] = useState(pages[page]);
  const [searchQuery,setSearchQuery] = useState("");
  const [searchCategory,setSearchCategory] = useState("name");
  const headings = [
    {id:"visitor_id",header:"Visitor ID"},
    {id:"name",header:"Name"},
    {id:"email",header:"Email"},
    {id:"registration_number",header:"KMC number"},
    {id:"phone_number",header:"Phone number"},
    {id:"attendance",header:"Attendance"}
    
  ]
  useEffect(() => {
    setSelectedSessionID(props.props.selectedSessionID);
    getSessionTitleBySessionId(props.props.selectedSessionID)
    .then((result)=>setSelectedSessionTitle(result.data.message[0].session_title))
    .catch();
    getAllVisitors()
    .then(result=>setRecords(result.data.message))
    .catch((err)=>console.log(err));
  
}, [])
recordRef.current = records; 


const handlePageChange=(event,newpage)=>{
    setPage(newpage);
  }
  const handleOnChangeSearchCategory= (e)=>{
    setSearchCategory(e.target.value);
  }
  const handleRowsChangePerPage=(event)=>{
    setRecordsPerPage(parseInt(event.target.value,10));
    setPage(0);
  }

  const handleOnChangeSearchQuery=(e)=>{
    setSearchQuery(e.target.value);
  }
  const getAllVisitors = ()=>{
    return axios.get("https://kisargo-api.tk/api/getAllVisitors")
  }
  const getAttendanceStatus = (visitor_id,session_id)=>{
    return axios.get(`https://kisargo-api.tk/api/getAttendanceStatus/${visitor_id}/${session_id}`);
  }
  const getSessionTitleBySessionId = (session_id)=>{
    return axios.get(`https://kisargo-api.tk/api/getSessionTitleBySessionId/${session_id}`);
  }
  const handleRefresh = (e)=>{
    if(refresh) setRefresh(false)
    else setRefresh(true);
  }
  
  const recordsAfterPagingAndFilter=  ()=>{
    return records.filter((individualVisitorObject)=>{
      if(searchQuery === ""){
        return individualVisitorObject
      }
      else if (individualVisitorObject[searchCategory.toLowerCase()].includes(searchQuery)){
        return individualVisitorObject
      }
    })
      .slice(page*recordsPerPage,(page+1)*recordsPerPage);
  }
  
  
  return (
    <>
    {refresh}
    <Navbar/>
    <Paper elevation={5} sx={{margin:"5% 5%",marginLeft:"25vh",marginRight:"25vh",width:"fit-content"}}>
    <Paper elevation={5} style={{textAlign:"center"}}>
    <Typography variant="h5" style={{backgroundColor:"#3abca7",color:"#fff",padding:10}}>Attendance for {selectedSessionTitle}</Typography>
    </Paper>
    
    <Toolbar style={{display:"flex",justifyContent:"space-evenly", padding:10}}>
    <Button variant="outlined" style={{color:"#3abca7",borderColor:"#3abca7"}} onClick={e=>handleRefresh(e)}>Refresh</Button>
      
    <TextField id="search-field" label={<SearchIcon/>}
              placeholder={`Search by ${searchCategory} `}
              variant="filled" 
              onChange={handleOnChangeSearchQuery}
              />
    <TextField
      labelId="search-bar"
      select={true}
      id="search-bar"
      value={searchCategory}
      label="Search by"
      onChange={handleOnChangeSearchCategory}
      style={{marginLeft:"10px"}}
      >
      <MenuItem value="name">Name</MenuItem>
      <MenuItem value="email">Email</MenuItem>
      <MenuItem value="phone_number">Phone number</MenuItem>
      <MenuItem value="registration_number">KMC number</MenuItem>
      <MenuItem value="visitor_id">Visitor ID</MenuItem>
      
    </TextField>
    </Toolbar>
    <Table>
       
    <TableContainer >
        <TableHead>
                 <TableRow>
                    {headings.map(heading=> <TableCell key={heading.id}>{heading.header}</TableCell>)}
                </TableRow>
        </TableHead>
        
        <TableBody>
        {recordsAfterPagingAndFilter().map((item)=>{
            return (
              <>
            <TableRow key={item.email}>
                <TableCell>{item.visitor_id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.registration_number}</TableCell>
                <TableCell>{item.phone_number}</TableCell>
                {
                  getAttendanceStatus(item.visitor_id,selectedSessionID)
                  .then((result)=> item.att = (result.data.message[0].notPresent))
                  .catch()
                  && item["att"]  
                  ?
                  <TableCell><ClearIcon style={{backgroundColor:"#db5a5a",color:"#fff"}}/></TableCell>
                  :
                  <TableCell><CheckIcon style={{backgroundColor:"#3abca7",color:"#fff"}}/></TableCell>
                  
                }
            </TableRow>
            </>
            )
        })}
        </TableBody>
        
    </TableContainer>
    </Table>
    <TablePagination
            page={page} 
            rowsPerPageOptions={pages}
            rowsPerPage={recordsPerPage}
            count={records.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsChangePerPage}
        />
    </Paper>
    
    </>
  )
}
