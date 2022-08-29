import Register from "./components/Register.js";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Dashboard from "./components/Dashboard.js";
import Login from "./components/Login.js";
import RouteProtector from "./components/RouteProtector.js";
import QRFinal from "./components/QRFinal.js";
import QRCodeScannerPlugin from "./components/QRCodeScanner.js";
import CreateSession from "./components/CreateSession.js";
import EndSession from "./components/EndSession.js";
import Logs from "./components/Logs.js";

export default function Routes(){
    return (
        <Router>
            <Switch>
                <Route exact path="/login"><Login/></Route>
                <Route exact path="/register" ><Register/></Route>
                <Route exact path="/dashboard" ><RouteProtector> <Dashboard /> </RouteProtector></Route>
                <Route exact path="/qrfinal" ><RouteProtector> <QRFinal /> </RouteProtector></Route>
                <Route exact path="/scan" ><RouteProtector> <QRCodeScannerPlugin /> </RouteProtector></Route>
                <Route exact path="/logs" ><RouteProtector> <Logs /> </RouteProtector></Route>
                <Route exact path="/createSession" ><CreateSession/></Route>
                <Route exact path="/endSession" ><EndSession/></Route>
                <Route exact path="/pageNotFound" ><h1>404!</h1></Route>
        </Switch>
        </Router>
    ) 
}
