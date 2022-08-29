import { Table,TableBody, TableContainer, TableHead,TableRow,TableCell, Paper, TablePagination } from '@mui/material'
import axios from 'axios';
import React,{useContext, useEffect,useRef,useState} from 'react'
import Navbar from './Navbar';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import { useHistory } from 'react-router-dom';
import VisitorPropsContext from '../context/VisitorPropsContext';
export default function Logs() {
  const visitorPropsHandler = useContext(VisitorPropsContext);
  const[records,setRecords] = useState([]);
  const recordRef = useRef();
  const pages = [10,30,50]
  const[page,setPage] = useState(0);
  const [recordsPerPage,setRecordsPerPage] = useState(pages[page]);
  const history = useHistory();
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
  const handleRowsChangePerPage=(event)=>{
    setRecordsPerPage(parseInt(event.target.value,10));
    setPage(0);
  }

  const recordsAfterPaging = ()=>{
    return records.slice(page*recordsPerPage,(page+1)*recordsPerPage);
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
    
    <Table >
       
    <TableContainer >
        <TableHead>
                 <TableRow>
                    {headings.map(heading=> <TableCell key={heading.id}>{heading.header}</TableCell>)}
                </TableRow>
        </TableHead>
        
        <TableBody>
        {recordsAfterPaging().map(item=>{
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
    return axios.get("https://mineral-api-server.herokuapp.com/api/getAllVisitors")
}