import React from "react";
import "./App.css";
import SessionState from "./context/SessionState";
import TokenState from "./context/TokenState.js";
import VisitorPropsState from "./context/VisitorPropsState";
import Routes from "./Routes.js";
export default function App(){
    return (
        <SessionState>
        <>
        <VisitorPropsState>
            <TokenState>
                <Routes></Routes>
            </TokenState>
        </VisitorPropsState>
        </>
        </SessionState>
    );
}
