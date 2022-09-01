import { Table,TableBody, TableContainer, TableHead,TableRow,TableCell, 
  Paper, Select,MenuItem, TablePagination ,TextField, Toolbar, Typography, Grid} from '@mui/material'
import axios from 'axios';
import React,{useContext, useEffect,useRef,useState} from 'react'
import Navbar from './Navbar';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import { useHistory } from 'react-router-dom';
import VisitorPropsContext from '../context/VisitorPropsContext';
import SearchIcon from '@mui/icons-material/Search';
export default function Logs() {
  const visitorPropsHandler = useContext(VisitorPropsContext);
  const[records,setRecords] = useState([]);
  const recordRef = useRef();
  const pages = [10,30,50]
  const[page,setPage] = useState(0);
  const [recordsPerPage,setRecordsPerPage] = useState(pages[page]);
  const history = useHistory();
  const [searchQuery,setSearchQuery] = useState("");
  const [searchCategory,setSearchCategory] = useState("name");
  useEffect(() => {
    getAllVisitors()
    .then(result=>setRecords(result.data.message))
    .catch((err)=>console.log(err));
  }, [])
  
  recordRef.current = records; 

  const headings = [
                    {id:"visitor_id",header:"Visitor ID"},
                    {id:"name",header:"Name"},
                    {id:"email",header:"Email"},
                    {id:"registration_number",header:"KMC number"},
                    {id:"phone_number",header:"Phone number"},
                    {id:"sponsor_name",header:"Sponsor name"},
                    {id:"amount_paid",header:"Amount paid "},
                    {id:"upi_number",header:"Transaction ID"},
                    {id:"print_qr_code",header:"Print QR Code"}
                    
                    ];
  const handlePageChange=(event,newpage)=>{
    console.log(event)
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
  const handQrClick = (e,item)=>{
    e.preventDefault();
    visitorPropsHandler.updateVisitorProps(item);
    history.push("/qrFinal");
  }
  
  
  return (
    <>
    <h1>{visitorPropsHandler.visitor_id}</h1>
    <Navbar/>
    <Paper elevation={5} sx={{margin:"5% 5%",marginLeft:"25vh",marginRight:"25vh",width:"fit-content"}}>
    <Paper elevation={5} style={{textAlign:"center"}}>
    <Typography variant="h5" style={{backgroundColor:"#3abca7",color:"#fff",padding:10}}>ENTRY LOG</Typography>
    </Paper>
    
    <Toolbar style={{display:"flex",padding:10}}>
      
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
        {recordsAfterPagingAndFilter().map(item=>{
            return (<TableRow key={item.email}>
                <TableCell>{item.visitor_id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.registration_number}</TableCell>
                <TableCell>{item.phone_number}</TableCell>
                <TableCell>{item.sponsor_name === "" ? "-" : item.sponsor_name}</TableCell>
                <TableCell>{item.amount_paid}</TableCell>
                <TableCell>{item.upi_number === "" ? "-" : item.upi_number}</TableCell>
                <TableCell><QrCode2Icon onClick={(e)=>handQrClick(e,item)}></QrCode2Icon></TableCell>
                
            </TableRow>)
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


const getAllVisitors = ()=>{
    return axios.get("https://kisargo-api.tk/api/getAllVisitors")
}