import add from "../icons/add2.svg";
import scanner from "../icons/scanner.svg";
import list from "../icons/list.svg";
import { useHistory } from "react-router-dom";
import excelAdd from "../icons/excel-add-icon.svg";
import attendance from "../icons/schedule.svg";
import { Typography } from "@mui/material";
export default function Tools({getDisplayStatusFromTools}){
    const history = useHistory();
    const routeToScan = ()=> history.push("/scan");
    const routeToLogs = ()=> history.push("/logs");
    const routeToAttendance = ()=> history.push("/attendance");
    
    return(<>
            <div className="header">
            </div>
            <div className="trunk">
            <div className="trunk-row">
            <div className="trunk-item">
            <button onClick={()=>getDisplayStatusFromTools[0]("block")} className="tool-btn"><img  className="add-icon" src={add} alt="icon"/></button>
            <Typography>Add an entry</Typography>
            </div>
            <div className="trunk-item">
            <button onClick={routeToScan} className="tool-btn"><img  className="add-icon" src={scanner} alt="icon"/></button>
            <Typography>Scan QR code</Typography>
            </div>
            <div onClick={routeToLogs} className="trunk-item">
            <button  className="tool-btn"><img  className="add-icon" src={list} alt="icon"/></button>
            <Typography>Check Log</Typography>
            </div>
            <div className="trunk-item">
            <button  className="tool-btn" onClick={()=>getDisplayStatusFromTools[1](true)}><img  className="add-icon" src={excelAdd} alt="icon"/></button>
            <Typography>CSV/Excel entries</Typography>
            </div>
            <div onClick={routeToAttendance} className="trunk-item">
            <button  className="tool-btn"><img  className="add-icon" src={attendance} alt="icon"/></button>
            <Typography>Monitor Attendance</Typography>
            </div>
            </div>
            </div>

        </>);
}

