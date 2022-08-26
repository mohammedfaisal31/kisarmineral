import {useState} from "react";
import  VisitorPropsContext  from "./VisitorPropsContext.js";


const VisitorPropsState = ({children}) =>{
    const visitorPropsInit = {
        visitor_id:"#12345",
        name: "Dummy User", 
        email: "dummy@dummy.com", 
        hone_number: "0000", 
        registration_number: "kkkkk", 
        visitor_type: "xxxx",
        conference_day: "yyyy",
        if_sponsored: "zzzz",
        sponsor_name: "zzzzzqq",
        payment_method: "aaaaa",
        upi_number:"bbbbb",
        amount_paid:"11111"
        }
    const [visitorProps,setVisitorProps] = useState(visitorPropsInit);

    const updateVisitorProps = (updatedProps) =>{
        setVisitorProps(updatedProps);
    }
    return (
        <VisitorPropsContext.Provider value={{visitorProps,updateVisitorProps}}>
            {children}
        </VisitorPropsContext.Provider>
    )

}
export default VisitorPropsState;
