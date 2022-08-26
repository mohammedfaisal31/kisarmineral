import logo from "../icons/logo.svg"
import { useContext } from "react";
import TokenContext from "../context/TokenContext";
import { useHistory } from "react-router-dom";
export default function Navbar(){
    const auth = useContext(TokenContext);
    const history = useHistory();
    const handleLogout =  () =>{
        auth.logout("INVALID");
        history.push("/login");
    }
    const handleCheckLog = ()=> history.push("/")
    return(<>
        <div className="nav-wrap">
        <img src={logo} className="logo" alt="mineral"></img>
        <nav>
            <ul className="nav_links">
                <li><a href="/">About developer</a></li>
                <li><button className="logout-btn" onClick={handleCheckLog}>Check Log</button></li>
                <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
            </ul>

        </nav>
        </div>
        
    </>);
}