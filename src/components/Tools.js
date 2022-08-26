import add from "../icons/add2.svg"
import scanner from "../icons/scanner.svg"
import list from "../icons/list.svg"
import { useHistory } from "react-router-dom";
export default function Tools({getDisplayStatusFromTools}){
    const history = useHistory();
    const routeToScan = ()=> history.push("/scan");
    return(<>
            <div className="header">
            </div>
            <div className="trunk">
            <div className="trunk-row">
            <div className="trunk-item">
            <button onClick={()=>getDisplayStatusFromTools("block")} className="tool-btn"><img  className="add-icon" src={add} alt="icon"/></button>
            <p>Add an entry</p>
            </div>
            <div className="trunk-item">
            <button onClick={routeToScan} className="tool-btn"><img  className="add-icon" src={scanner} alt="icon"/></button>
            <p>Scan QR code</p>
            </div>
            <div className="trunk-item">
            <button  className="tool-btn"><img  className="add-icon" src={list} alt="icon"/></button>
            <p>Check Log</p>
            </div>
            </div>
            </div>

        </>);
}

